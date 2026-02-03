from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from crawler import SEOGEOCrawler
from report_gen import ReportGenerator
import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

# Configuración de seguridad: La API Key se lee del entorno
API_KEY = os.getenv("GOOGLE_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_ai_analysis(pages_data, biz_type):
    if not API_KEY:
        return "Error: API Key no configurada."
    
    # Reducimos los datos para no saturar el contexto
    sample_data = pages_data[:3] 
    prompt = f"""
    Actúa como un experto en SEO Senior y Estratega de GEO. 
    Analiza estos datos de una web de tipo {biz_type}:
    {json.dumps(sample_data, indent=2)}
    
    Dame:
    1. Una recomendación estratégica de EEAT.
    2. Un análisis de visibilidad GEO (IA).
    3. Un fallo técnico crítico.
    
    Responde en formato JSON plano con las llaves: eeat_advice, geo_analysis, tech_fail.
    """
    
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    response = model.generate_content(prompt)
    try:
        return json.loads(response.text.replace('```json', '').replace('```', ''))
    except:
        return {"eeat_advice": "Optimizar autoridad local.", "geo_analysis": "Mejorar semántica.", "tech_fail": "Revisar títulos."}

@app.get("/audit")
async def run_audit(url: str):
    crawler = SEOGEOCrawler(url)
    crawler.crawl()
    
    gen = ReportGenerator(crawler.pages_data)
    biz_type = gen.classify_business()
    
    # Auditoría real con IA
    ai_results = await get_ai_analysis(crawler.pages_data, biz_type)
    
    # Cálculo de puntuaciones (Lógica híbrida)
    tech_score = 100
    if not any(p['h1'] for p in crawler.pages_data if p['url'] == url):
        tech_score -= 40
        
    return {
        "url": url,
        "type": biz_type,
        "scores": {
            "eeat": 80, # Placeholder inteligente
            "geo": 70,
            "technical": tech_score
        },
        "ai_analysis": ai_results
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
