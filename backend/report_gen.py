import json

class ReportGenerator:
    def __init__(self, audit_data):
        self.data = audit_data

    def classify_business(self):
        # Lógica simple de clasificación por palabras clave en el texto
        full_text = " ".join([p.get('text', '').lower() for p in self.data])
        if any(w in full_text for w in ['arzt', 'zahn', 'med', 'klinik']):
            return "YMYL_HEALTH"
        if any(w in full_text for w in ['restaurant', 'bar', 'essen', 'menu']):
            return "LIFESTYLE_GASTRO"
        return "GENERAL_SERVICE"

    def generate_html_report(self):
        biz_type = self.classify_business()
        report = f"<h1>SEO-GEO Audit Report</h1>"
        report += f"<p>Business Type Detected: <b>{biz_type}</b></p>"
        
        # Simulación de puntuaciones basadas en la auditoría
        report += "<h2>Scoring</h2><ul>"
        report += "<li>EEAT: 7/10</li>"
        report += "<li>GEO: 6/10</li>"
        report += "<li>Technical: 5/10</li></ul>"
        
        return report

# Ejemplo de uso interno
if __name__ == "__main__":
    with open('projects/seo_audit_tool/backend/temp_crawl.json', 'r') as f:
        data = json.load(f)
    gen = ReportGenerator(data)
    print(f"Clasificación detectada: {gen.classify_business()}")
