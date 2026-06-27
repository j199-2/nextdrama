'use client'

import { useState } from 'react'

export default function Home() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleFetchTrends = async () => {
    setLoading(true)
    setResults([])
    setHasSearched(true)

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const json = await response.json()
      if (json.success) {
        setResults(json.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen text-white bg-[#050608] font-sans flex flex-col items-center justify-start p-4 md:p-8">
      
      {/* Contenedor Máximo Centrado */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Encabezado Principal Centrado */}
        <header className="text-center mt-16 mb-8 w-full">
          <div className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase mb-3">
            NEXTGEN CREATORS ECOSYSTEM • RADAR EN TIEMPO REAL
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-4">
            THE DRAMA JOURNAL
          </h1>
          <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto italic leading-relaxed">
            Filtrado estricto automatizado: Escaneo activo de episodios gratuitos para canales faceless.
          </p>
        </header>

        {/* 📰 BOTÓN ÚNICO DE BÚSQUEDA CENTRADO */}
        <div className="w-full flex justify-center mb-12">
          <button
            onClick={handleFetchTrends}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl transition-all border border-blue-500/20 shadow-lg shadow-blue-600/10 active:scale-95 disabled:opacity-50 cursor-pointer text-center"
          >
            {loading ? "🔍 Escaneando Plataformas..." : "📰 Buscar Dramas del Momento"}
          </button>
        </div>

        {/* 📢 CUBÍCULO DE ANUNCIOS INTEGRADO */}
        <div className="w-full mb-10 p-5 bg-[#111317] border border-dashed border-blue-500/20 rounded-2xl text-center relative overflow-hidden shadow-lg">
          <span className="absolute top-2 left-3 text-[8px] font-black tracking-widest text-blue-400/40 uppercase">Espacio Publicitario</span>
          <div className="py-2 flex flex-col items-center justify-center">
            <p className="text-xs font-bold text-gray-400">🤖 Cubículo de Anuncio Disponible</p>
            <p className="text-[11px] text-gray-600 mt-0.5">Listo para enlazar tus cursos de Whop, ofertas o redes de monetización.</p>
          </div>
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div className="w-full space-y-6">
          
          {/* ⏳ Animación de Carga en Tiempo Real */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 bg-[#0d0e12]/30 border border-gray-900 rounded-2xl">
              <div className="w-9 h-9 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-blue-400/80 font-mono tracking-widest uppercase animate-pulse">
                Filtrando plataformas de streaming y validando capítulos gratis...
              </p>
            </div>
          )}

          {/* 📄 Estado Inicial Pasivo */}
          {!hasSearched && !loading && (
            <div className="text-center py-12 bg-[#0d0e12]/40 border border-dashed border-gray-900 rounded-2xl max-w-md mx-auto">
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Presiona el botón superior para iniciar el rastreo dinámico en las bases de datos de mini-series verticales.
              </p>
            </div>
          )}

          {/* 📰 Resultados Desplegados en Tiempo Real */}
          {hasSearched && !loading && results.map((drama, idx) => (
            <div 
              key={idx} 
              className="bg-[#0d0e12] border border-gray-800/60 hover:border-blue-500/20 rounded-2xl p-6 transition-all shadow-xl grid grid-cols-1 md:grid-cols-4 gap-6 transform hover:-translate-y-0.5 duration-200"
            >
              {/* Columna de Métricas */}
              <div className="border-b md:border-b-0 md:border-r border-gray-800/40 pb-4 md:pb-0 md:pr-4 flex flex-col justify-between gap-3">
                <div>
                  <div className="text-[9px] uppercase font-black text-blue-400 tracking-wider mb-1">Impacto Viral</div>
                  <div className="text-xs font-black text-white bg-[#050608] px-2.5 py-1.5 rounded-lg border border-gray-800 w-fit">
                    {drama.viralRate}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] uppercase font-black text-emerald-400 tracking-wider mb-1">Acceso Libre</div>
                  <div className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 w-fit">
                    {drama.freeEpisodes}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] uppercase font-black text-gray-500 tracking-wider mb-1">Idioma de Origen</div>
                  <div className="text-xs font-bold text-gray-300">{drama.lang}</div>
                </div>
              </div>

              {/* Columna de Textos de la Serie */}
              <div className="md:col-span-2 flex flex-col justify-center">
                <h3 className="text-xl font-black text-white tracking-tight">
                  {drama.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mt-3 bg-[#050608] p-3 rounded-xl border border-gray-900/80">
                  <strong className="text-blue-500 block text-[9px] uppercase tracking-wider mb-1">Resumen del Guión:</strong>
                  {drama.plot}
                </p>
              </div>

              {/* Columna de Botón y Plataforma */}
              <div className="flex flex-col justify-center items-stretch pt-4 md:pt-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-800/40">
                <div className="text-center mb-3">
                  <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-wider">Monitoreada en:</span>
                  <span className="text-xs font-black text-gray-300 block mt-0.5">{drama.platformName}</span>
                </div>
                
                <a 
                  href={drama.directUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-4 rounded-xl text-xs text-center transition-all shadow-md flex items-center justify-center gap-2 no-underline"
                >
                  <span>Ver Contenido Gratis</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
