"use client";

import React, { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runAudit = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/audit?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error running audit:", error);
      alert("Error conectando con el backend. Asegúrate de que main.py esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans p-4 md:p-10 flex flex-col items-center">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#7000ff] opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00f2ff] opacity-10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-5xl w-full">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#7000ff] font-black text-xl tracking-tighter mb-4 uppercase">
            KAI SYSTEMS // Sales Weapon
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            SEO & GEO <br/> 
            <span className="text-gray-500 uppercase italic font-light">Audit Engine</span>
          </h1>
        </header>

        {/* Input Section */}
        <div className="relative mb-12 group">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter client website URL..." 
            className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-8 text-xl focus:outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff] transition-all shadow-2xl group-hover:border-white/20"
          />
          <button 
            onClick={runAudit}
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 bg-gradient-to-r from-[#00f2ff] to-[#7000ff] text-black font-bold px-8 rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "SCANNING..." : "RUN AUDIT"}
          </button>
        </div>

        {results && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Main EEAT Card */}
            <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:border-white/20 transition-all shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">EEAT</div>
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Authority Analysis</div>
              <div className="text-3xl font-bold mb-4">Trust Score: <span className="text-[#00ffaa]">{results.scores?.eeat}%</span></div>
              <div className="inline-block bg-[#00ffaa]/10 text-[#00ffaa] text-[10px] font-bold px-3 py-1 rounded-md mb-6 uppercase border border-[#00ffaa]/20">
                {results.type} Detected
              </div>
              <p className="text-gray-300 leading-relaxed text-lg italic">
                "{results.ai_analysis?.eeat_advice}"
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-2xl">
              <div className="w-24 h-24 rounded-full border-4 border-[#00f2ff] flex items-center justify-center text-3xl font-black shadow-[0_0_30px_rgba(0,242,255,0.2)] mb-4 text-[#00f2ff]">
                {(results.scores?.technical / 10).toFixed(1)}
              </div>
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Global Rank</div>
            </div>

            {/* GEO Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl border-l-[#00f2ff]/30 border-l-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#00ffaa] rounded-full animate-pulse shadow-[0_0_10px_#00ffaa]"></div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">IA Discoverability (GEO)</div>
              </div>
              <div className="text-xl font-bold mb-3 text-[#00f2ff]">AI Compatibility</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {results.ai_analysis?.geo_analysis}
              </p>
            </div>

            {/* Tech SEO Card */}
            <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl border-l-[#ff2d55]/30 border-l-4">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Technical Engine Status</div>
              <div className="text-2xl font-bold text-[#ff2d55] mb-3">Health Alert</div>
              <p className="text-gray-400 text-md leading-relaxed font-mono">
                {results.ai_analysis?.tech_fail}
              </p>
              <div className="mt-4 text-xs text-gray-600">
                Backend Score: {results.scores?.technical}/100
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
