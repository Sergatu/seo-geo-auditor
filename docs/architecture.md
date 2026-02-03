# SEO-GEO Auditor Architecture

## Project Overview
An advanced SEO auditing tool focused on post-March 2024 Google updates (EEAT) and Generative Engine Optimization (GEO).

## Tech Stack
- **Backend:** Python (FastAPI)
- **Database:** Supabase (PostgreSQL + Vector)
- **Frontend:** Next.js (React)
- **AI Engine:** Gemini/OpenAI for semantic auditing

## Core Modules
1. **EEAT Module:** Scans for certifications (e.g., Swiss Dance), team bios, and social proof.
2. **GEO Module:** Simulates LLM queries to test business "discoverability" in AI answers.
3. **Helpful Content Module:** Analyzes text utility vs. keyword stuffing.
4. **Local Context Module:** Checks for Swiss-specific integrations (Krankenkasse, SBB/ZVV, local parking).

## Directory Structure
- `/backend`: Python FastAPI logic
- `/frontend`: Next.js dashboard
- `/docs`: Documentation and research
