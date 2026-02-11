return (
  <div className="generator-container p-6 max-w-5xl mx-auto text-white bg-black/20 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl">
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight drop-shadow-md">
      Glass & Neo Generator
    </h1>

    {/* Controls – always visible */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      {/* Glass Column */}
      <div className="space-y-5 bg-black/15 backdrop-blur-md p-5 rounded-2xl border border-cyan-500/20">
        <h2 className="text-xl font-semibold text-cyan-400">Glassmorphism</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Blur: {glassBlur}px</label>
            <input type="range" min="0" max="40" value={glassBlur} onChange={e => setGlassBlur(+e.target.value)} className="w-full h-2 accent-cyan-500 bg-cyan-900/30 rounded-lg cursor-pointer" />
          </div>

          <div>
            <label className="block text-sm mb-1">Opacity: {glassOpacity.toFixed(2)}</label>
            <input type="range" min="0" max="0.5" step="0.01" value={glassOpacity} onChange={e => setGlassOpacity(+e.target.value)} className="w-full h-2 accent-cyan-500 bg-cyan-900/30 rounded-lg cursor-pointer" />
          </div>

          <div>
            <label className="block text-sm mb-1">Border opacity: {glassBorderOpacity.toFixed(2)}</label>
            <input type="range" min="0" max="0.5" step="0.01" value={glassBorderOpacity} onChange={e => setGlassBorderOpacity(+e.target.value)} className="w-full h-2 accent-cyan-500 bg-cyan-900/30 rounded-lg cursor-pointer" />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm">BG Color:</label>
            <input type="color" value={glassColor} onChange={e => setGlassColor(e.target.value)} className="w-10 h-8 rounded border border-cyan-500/40 cursor-pointer bg-transparent" />
          </div>
        </div>

        <div 
          className="preview-box w-full aspect-[4/3] rounded-2xl border border-cyan-500/30 shadow-xl mx-auto"
          style={{
            background: `${glassColor}${Math.round(glassOpacity * 255).toString(16).padStart(2, '0')}`,
            backdropFilter: `blur(${glassBlur}px)`,
            WebkitBackdropFilter: `blur(${glassBlur}px)`,
          }}
        >
          Glass Preview
        </div>
      </div>

      {/* Neo Column */}
      <div className="space-y-5 bg-black/15 backdrop-blur-md p-5 rounded-2xl border border-pink-500/20">
        <h2 className="text-xl font-semibold text-pink-400">Neomorphism</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Shadow size: {neoShadow}px</label>
            <input type="range" min="1" max="20" value={neoShadow} onChange={e => setNeoShadow(+e.target.value)} className="w-full h-2 accent-pink-500 bg-pink-900/30 rounded-lg cursor-pointer" />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" checked={neoInset} onChange={e => setNeoInset(e.target.checked)} className="accent-pink-500 w-5 h-5 cursor-pointer" />
            <label className="text-sm">Inset / embossed</label>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm">Base color:</label>
            <input type="color" value={neoColor} onChange={e => setNeoColor(e.target.value)} className="w-10 h-8 rounded border border-pink-500/40 cursor-pointer bg-transparent" />
          </div>
        </div>

        <div 
          className="preview-box w-full aspect-[4/3] rounded-2xl shadow-2xl mx-auto"
          style={{ background: neoColor, boxShadow: `${neoInset ? 'inset ' : ''}${neoShadow}px ${neoShadow}px ${neoShadow*2}px #bebebe, ${neoInset ? 'inset ' : ''}-${neoShadow}px -${neoShadow}px ${neoShadow*2}px #ffffff` }}
        >
          Neo Preview
        </div>
      </div>
    </div>

    {/* Button + copy feedback – always visible */}
    <div className="mt-8 flex flex-col items-center gap-4">
      <button 
        onClick={generateCss}
        className="watch-btn px-10 py-3 text-lg font-bold shadow-lg hover:shadow-2xl transition-all"
      >
        Generate & Copy CSS
      </button>

      {copied && (
        <div className="text-green-400 font-medium animate-pulse">
          Copied to clipboard! ✓
        </div>
      )}
    </div>

    {/* Generated CSS – shows below when ready */}
    {generatedCss && (
      <div className="mt-6">
        <h3 className="text-lg mb-2 text-cyan-300 text-center">Generated CSS – ready to use</h3>
        <pre className="p-4 bg-black/30 rounded-xl overflow-x-auto text-sm font-mono border border-cyan-500/20 whitespace-pre-wrap">
          {generatedCss}
        </pre>
      </div>
    )}
  </div>
);
