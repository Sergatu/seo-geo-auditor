import React from 'react';

export default function Home() {
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
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#7000ff] font-black text-xl tracking-tighter mb-4">
            KAI SYSTEMS // 01
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            SEO & GEO <br/> 
            <span className="text-gray-500">INTELLIGENCE AUDITOR</span>
          </h1>
        </header>

        {/* Input Section */}
        <div className="relative mb-12">
          <input 
            type="text" 
            placeholder="Enter website URL (e.g. https://latindancepassion.ch)" 
            className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-8 text-xl focus:outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff] transition-all shadow-2xl"
          />
          <button className="absolute right-3 top-3 bottom-3 bg-gradient-to-r from-[#00f2ff] to-[#7000ff] text-black font-bold px-8 rounded-2xl hover:scale-105 transition-transform">
            RUN AUDIT
          </button>
        </div>

        {/* Bento Grid Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main EEAT Card */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:border-white/20 transition-all">
            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">EEAT Analysis</div>
            <div className="text-3xl font-bold mb-4">Authority Score: <span className="text-[#00ffaa]">84%</span></div>
            <div className="inline-block bg-[#00ffaa]/10 text-[#00ffaa] text-[10px] font-bold px-3 py-1 rounded-md mb-6 uppercase">
              Verified by Swiss Dance
            </div>
            <p className="text-gray-400 leading-relaxed text-lg">
              Strategic Recommendation: Move certification badges to the global footer to increase trust signal density across all indexed pages.
            </p>
          </div>

          {/* Score Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full border-4 border-[#00ffaa] flex items-center justify-center text-3xl font-black shadow-[0_0_30px_rgba(0,255,170,0.2)] mb-4">
              8.2
            </div>
            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Global Rank</div>
          </div>

          {/* GEO Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#00ffaa] rounded-full animate-pulse shadow-[0_0_10px_#00ffaa]"></div>
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">AI Discoverability (GEO)</div>
            </div>
            <div className="text-2xl font-bold mb-3 text-[#00f2ff]">High Synergy</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Website structure is highly compatible with ChatGPT and Perplexity semantic extraction patterns.
            </p>
          </div>

          {/* Tech SEO Card */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem]">
            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Technical SEO Status</div>
            <div className="text-2xl font-bold text-[#ff2d55] mb-3">Critical: Missing H1 Tags</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The landing page is currently missing a main Header 1 tag. This significantly impacts indexation and semantic clarity for LLMs.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
