import subprocess
import os

class PDFSalesGenerator:
    def __init__(self, audit_data):
        self.data = audit_data
        self.template_path = "projects/seo_audit_tool/backend/pdf_template.md"

    def generate(self, business_name, output_filename):
        with open(self.template_path, 'r') as f:
            template = f.read()

        # Reemplazamos los placeholders con datos reales de la auditoría
        report = template.replace("[NOMBRE_NEGOCIO]", business_name)
        report = report.replace("[SCORE_EEAT]", str(self.data['scores']['eeat']))
        report = report.replace("[CONSEJO_EEAT]", self.data['ai_analysis']['eeat_advice'])
        report = report.replace("[ESTADO_GEO]", "NIVEL BAJO" if self.data['scores']['geo'] < 50 else "OPTIMIZABLE")
        report = report.replace("[ANALISIS_GEO]", self.data['ai_analysis']['geo_analysis'])
        report = report.replace("[FALLO_TECNICO]", self.data['ai_analysis']['tech_fail'])

        temp_md = f"{output_filename}.md"
        with open(temp_md, 'w') as f:
            f.write(report)

        # Convertimos a PDF usando pandoc
        pdf_path = f"{output_filename}.pdf"
        try:
            subprocess.run(["pandoc", temp_md, "-o", pdf_path, "--pdf-engine=pdflatex"], check=True)
            os.remove(temp_md)
            return pdf_path
        except Exception as e:
            return f"Error generando PDF: {e}"
