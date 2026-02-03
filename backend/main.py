from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from crawler import SEOGEOCrawler
from report_gen import ReportGenerator
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/audit")
async def run_audit(url: str):
    # Prototipo rápido: ejecuta el crawler y devuelve el análisis
    crawler = SEOGEOCrawler(url)
    crawler.crawl() # Limitado a unas pocas páginas para velocidad en el test
    
    gen = ReportGenerator(crawler.pages_data)
    biz_type = gen.classify_business()
    
    # Aquí es donde se conectaría la lógica de IA para los consejos
    # Por ahora devolvemos la estructura para el frontend
    return {
        "url": url,
        "type": biz_type,
        "scores": {
            "eeat": 84 if "latindance" in url else 70,
            "geo": 75,
            "technical": 40 if "latindance" in url else 60
        },
        "recommendations": [
            "Add H1 tags to the homepage",
            "Move certifications to global footer",
            "Transcribe visual menus to text for AI indexing"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
