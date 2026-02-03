# SEO-GEO Auditor

Herramienta avanzada de auditoría SEO centrada en EEAT (Google Marzo 2024) y GEO (Generative Engine Optimization).

## Estructura del Proyecto
- `/backend`: Motor de auditoría en Python (FastAPI + BeautifulSoup4).
- `/frontend`: Dashboard moderno en Next.js (Tailwind CSS + TypeScript).

## Instalación y Despliegue Local

### 1. Backend (Python)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
El servidor correrá en `http://localhost:8000`.

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
La interfaz estará disponible en `http://localhost:3000`.

## Características
- **EEAT Scanner:** Detecta señales de autoridad y confianza.
- **GEO Simulation:** Analiza la visibilidad semántica para modelos de IA.
- **Bento Dashboard:** Interfaz premium inspirada en diseños de vanguardia.
