'use client'
import { useState } from 'react'

export default function Home() {
  const [lang, setLang] = useState('es')
  const [category, setCategory] = useState('Todos')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const t = {
    es: {
      subtitle: "NEXTGEN CREATORS ECOSYSTEM",
      slogan: "CREATE • CONNECT • IMPACT",
      badgeText: "We empower the next generation of CREATORS to turn ideas into IMPACT.",
      toolTitle: "DramaFinder",
      toolVersion: "v1.2",
      desc: "Localizador de miniseries y dramas verticales web para grabación de pantalla en PC/Móvil.",
      navButton: "Ir a Roadmap Maestro",
      filterTitle: "Filtro de Contenido AI",
      labelCat: "Selecciona el Nicho Vertical:",
      btnSearch: "Rastrear Series Disponibles",
      btnLoading: "Escaneando Sitios Web...",
      resultsTitle: "Dramas Encontrados",
      reqs: "Requisitos: Vertical (9:16) | Gratis Online | Sin Restricciones de App",
      empty: "Selecciona un nicho de contenido y presiona buscar para extraer los enlaces directos de grabación.",
      plot: "Sinopsis / Trama:",
      site: "Plataforma:",
      btnLink: "Abrir para Grabar Pantalla",
      caps: "Caps GRATIS",
      categories: ['Todos', 'Venganza & Karma', 'Multimillonarios & CEO', 'Romance & Drama', 'Hombres Lobo & Fantasía', 'Acción']
    },
    en: {
      subtitle: "NEXTGEN CREATORS ECOSYSTEM",
      slogan: "CREATE • CONNECT • IMPACT",
      badgeText: "We empower the next generation of CREATORS to turn ideas into IMPACT.",
      toolTitle: "DramaFinder",
      toolVersion: "v1.2",
      desc: "Web vertical miniseries locator for direct desktop/mobile screen recording.",
      navButton: "Go to Roadmap Maestro",
      filterTitle: "AI Content Filter",
      labelCat: "Select Vertical Niche:",
      btnSearch: "Scan Available Series",
      btnLoading: "Scanning Web Sites...",
      resultsTitle: "Found Dramas",
      reqs: "Requirements: Vertical (9:16) | Free Online | No App Restrictions",
      empty: "Select a content niche and press search to extract direct recording links.",
      plot: "Plot / Synopsis:",
      site: "Platform:",
      btnLink: "Open to Screen Record",
      caps: "FREE Eps",
      categories: ['All', 'Vengeance & Karma', 'Billionaires & CEO', 'Romance & Drama', 'Werewolf & Fantasy', 'Action']
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResults([])

    try {
      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, lang })
      })
      const data = await res.json()
      if (data.success) {
        setResults(data.data)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const changeLanguage = (newLang) => {
    setLang(newLang)
    setCategory(newLang === 'es' ? 'Todos' : 'All')
    setResults([])
  }

  return (
    <div className="min-h-screen bg-[#050608] text-[#e2e8f0] font-sans antialiased selection:bg-[#bc00dd] selection:text-white relative overflow-x-hidden">
      
      {/* Luces de Fondo Estilo Neón */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#8a2be2] to-[#4b0082] opacity-10 blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#00bfff] to-[#0000ff] opacity-10 blur-[120px] pointer-events-none"></div>

      {/* HEADER PRINCIPAL */}
      <header className="w-full max-w-6xl mx-auto pt-8 px-4 md:px-8 mb-12">
        <div className="flex flex-col items-center text-center border-b border-gray-900 pb-8 relative">
          
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* BOTÓN INTER-HERRAMIENTAS */}
            <a 
              href="https://nextgencreat-l9t7n59ur-nbhjj.vercel.app/"
              className="bg-gradient-to-r from-[#1a1d24] to-[#111317] hover:from-[#252934] hover:to-[#1a1d24] text-xs font-bold tracking-wider text-[#00e5ff] uppercase px-4 py-2.5 rounded-xl border border-[#00e5ff]/20 hover:border-[#00e5ff]/50 shadow-[0_0_15px_rgba(0,229,255,0.1)] hover:shadow-[0_0_20px_rgba(0,229,255,0.25)] transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {t[lang].navButton}
            </a>

            {/* Selector de Idiomas */}
            <div className="bg-[#0f1115] p-1 rounded-xl border border-gray-800 flex gap-1">
              <button 
                type="button"
                onClick={() => changeLanguage('es')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all ${lang === 'es' ? 'bg-gradient-to-r from-[#a800dd] to-[#7000dd] text-white shadow-[0_0_10px_rgba(168,0,221,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ESP
              </button>
              <button 
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all ${lang === 'en' ? 'bg-gradient-to-r from-[#a800dd] to-[#7000dd] text-white shadow-[0_0_10px_rgba(168,0,221,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ENG
              </button>
            </div>
          </div>

          {/* Logotipo Centralizado */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#bc00dd] flex items-center justify-center shadow-[0_0_15px_rgba(188,0,221,0.6)] bg-black">
              <span className="text-white font-black text-xl tracking-tighter">NG</span>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black tracking-[0.25em] text-white uppercase m-0 leading-none">NEXTGEN</h2>
              <h3 className="text-xs font-medium tracking-[0.55em] text-[#94a3b8] uppercase m-0 mt-1">CREATORS</h3>
            </div>
          </div>

          <div className="text-[#94a3b8] text-[10px] tracking-[0.4em] font-bold uppercase mt-4">
            {t[lang].slogan}
          </div>

          {/* Eslogan Enmarcado Premium */}
          <div className="mt-5 max-w-xl mx-auto bg-[#050608] border border-[#bc00dd]/40 rounded-lg px-6 py-3 shadow-[inset_0_0_15px_rgba(188,0,221,0.05),0_0_15px_rgba(188,0,221,0.1)]">
            <p className="text-xs md:text-sm text-gray-300 tracking-wide font-medium">
              We empower the next generation of <span className="text-[#bc00dd] font-extrabold">CREATORS</span> to turn ideas into <span className="text-[#00e5ff] font-extrabold">IMPACT.</span>
            </p>
          </div>

          <h1 className="text-3xl font-black text-white mt-8 tracking-tight">
            {t[lang].toolTitle} <span className="text-[#bc00dd] text-xl font-bold bg-[#bc00dd]/10 px-2.5 py-0.5 rounded-md border border-[#bc00dd]/20 ml-1">{t[lang].toolVersion}</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-lg">{t[lang].desc}</p>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8 pb-32">
        
        {/* Panel Formulario */}
        <div className="bg-[#0f1115] p-6 rounded-2xl border border-gray-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-fit relative">
          <div className="absolute -top-[1px] -left-[1px] w-[30px] h-[30px] border-t-2 border-l-2 border-[#bc00dd] rounded-tl-2xl"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-[30px] h-[30px] border-b-2 border-r-2 border-[#00e5ff] rounded-br-2xl"></div>
          
          <h2 className="text-sm font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#bc00dd] shadow-[0_0_8px_#bc00dd]"></span>
            {t[lang].filterTitle}
          </h2>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                {t[lang].labelCat}
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {t[lang].categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold tracking-wide transition-all duration-200 ${
                      category === cat
                        ? 'bg-gradient-to-r from-[#bc00dd] to-[#7000dd] border-[#bc00dd] text-white shadow-[0_0_15px_rgba(188,0,221,0.3)]'
                        : 'bg-[#14181f] border-gray-900 text-gray-400 hover:border-gray-800 hover:text-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#bc00dd] to-[#00e5ff] hover:from-[#d900ff] hover:to-[#26eeff] text-black font-black text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-40 disabled:transform-none shadow-[0_0_20px_rgba(0,229,255,0.15)]"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{t[lang].btnLoading}</span>
                </div>
              ) : (
                t[lang].btnSearch
              )}
            </button>
          </form>
        </div>

        {/* Panel Resultados */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 border-b border-gray-900 pb-3">
            <h2 className="text-md font-black text-white uppercase tracking-wider">{t[lang].resultsTitle}</h2>
            <span className="text-[10px] text-gray-500 font-bold bg-[#0f1115] px-3 py-1 rounded border border-gray-900 uppercase tracking-wider">
              {t[lang].reqs}
            </span>
          </div>

          {results.length === 0 && !loading && (
            <div className="bg-[#0f1115]/40 border border-dashed border-gray-800/80 p-16 rounded-2xl text-center text-gray-500 flex flex-col items-center">
              <svg className="h-10 w-10 text-gray-700 mb-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-xs max-w-sm tracking-wide leading-relaxed">{t[lang].empty}</p>
            </div>
          )}

          {results.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#0f1115] border border-gray-900 hover:border-gray-800 rounded-2xl p-6 transition-all duration-300 relative group shadow-lg"
            >
              <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-black text-[#bc00dd] uppercase tracking-widest bg-[#bc00dd]/5 px-2.5 py-1 rounded border border-[#bc00dd]/20">
                    {item.category}
                  </span>
                  <h3 className="text-md font-black text-white mt-3 tracking-tight group-hover:text-[#00e5ff] transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-lg shadow-sm">
                  {item.freeEpisodes} {t[lang].caps}
                </div>
              </div>
              
              <div className="text-xs text-gray-400 leading-relaxed mb-5 bg-[#14181f] p-3 rounded-xl border border-gray-900">
                <strong className="text-gray-300 block mb-1 uppercase tracking-wider text-[10px] text-[#00e5ff]">{t[lang].plot}</strong> 
                {item.plot}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-gray-900">
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                  {t[lang].site} <span className="text-gray-300 font-black tracking-normal ml-1">{item.platformName}</span>
                </div>
                <a
                  href={item.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-[#14181f] border border-[#bc00dd]/30 hover:border-[#00e5ff] text-[11px] font-black uppercase tracking-wider text-white px-5 py-3 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  {t[lang].btnLink}
                  <svg className="w-3.5 h-3.5 text-[#00e5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* BARRA INFERIOR DE CARACTERÍSTICAS */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#050608]/90 backdrop-blur-md border-t border-[#bc00dd]/20 py-4 px-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-y-3 gap-x-6 text-center">
          <div className="flex items-center gap-2 px-3">
            <span className="text-[#bc00dd] text-sm">📱</span>
            <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">MOBILE FIRST</span>
          </div>
          <div className="hidden sm:block text-gray-800 font-light">|</div>
          <div className="flex items-center gap-2 px-3">
            <span className="text-[#bc00dd] text-sm">🧠</span>
            <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">AI POWERED</span>
          </div>
          <div className="hidden sm:block text-gray-800 font-light">|</div>
          <div className="flex items-center gap-2 px-3">
            <span className="text-[#bc00dd] text-sm">▶️</span>
            <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">VIRAL CONTENT</span>
          </div>
          <div className="hidden sm:block text-gray-800 font-light">|</div>
          <div className="flex items-center gap-2 px-3">
            <span className="text-[#bc00dd] text-sm">🌐</span>
            <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">GLOBAL IMPACT</span>
          </div>
          <div className="hidden sm:block text-gray-800 font-light">|</div>
          <div className="flex items-center gap-2 px-3">
            <span className="text-[#bc00dd] text-sm">$</span>
            <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">FINANCIAL FREEDOM</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
