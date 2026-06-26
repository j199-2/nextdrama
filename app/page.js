'use client'

import { useState } from 'react'

export default function Home() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const fetchTrendingNews = async () => {
    setLoading(true)
    setResults([])
    setHasSearched(true)

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_trending' })
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
    <div className="min-h-screen text-white p-4 md:p-8 bg-[#050608] font-sans selection:bg-blue-500/30">
      
      {/* Encabezado Estilo Periódico Digital */}
      <header className="max-w-5xl mx-auto text-center border-b-2 border-gray-800/80 pb-6 mb-8 mt-4">
        <div className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase mb-2">
          NEXTGEN CREATORS ECOSYSTEM • TRENDING RADAR
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          THE DRAMA JOURNAL
        </h1>
        <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-xl mx-auto italic">
          Filtrado estricto: Solo series con episodios gratuitos confirmados para creadores de contenido faceless.
        </p>

        <div className="mt-6">
          <button
            onClick={fetchTrendingNews}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg border border-blue-500/30 transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Escaneando Plataformas..." : "📰 Desplegar Series y Capítulos Gratis de Hoy"}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">

        {/* 📢 CUBÍCULO RESERVADO PARA ANUNCIOS Y PUBLICIDAD */}
        <div className="w-full max-w-5xl mx-auto mb-8 p-6 bg-[#111317] border border-dashed border-blue-500/30 rounded-2xl text-center relative overflow-hidden shadow-xl">
          <span className="absolute top-2 left-3 text-[9px] font-black tracking-widest text-blue-400/50 uppercase">Espacio Publicitario</span>
          <div className="py-4 flex flex-col items-center justify-center">
            <p className="text-sm font-bold text-gray-300">🤖 Cubículo de Anuncio Disponible</p>
            <p className="text-xs text-gray-500 mt-1">Listo para meter la publicidad, cursos o enlaces de monetización que me indiques.</p>
          </div>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">Filtrando y descartando series sin contenido gratuito...</p>
          </div>
        )}

        {/* Pantalla inicial */}
        {!hasSearched && !loading && (
          <div className="text-center py-16 bg-[#0d0e12] border border-dashed border-gray-800 rounded-2xl max-w-xl mx-auto">
            <span className="text-3xl block mb-3">🔍</span>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
              Presiona el botón superior para cargar el feed de noticias. El sistema omitirá automáticamente cualquier plataforma bloqueada o sin episodios gratis.
            </p>
          </div>
        )}

        {/* Feed del Blog */}
        <section className="space-y-6">
          {results.map((drama, idx) => (
            <div 
              key={idx} 
              className="bg-[#0d0e12] border border-gray-800/80 hover:border-gray-700 rounded-2xl p-6 transition-all shadow-xl grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {/* Columna 1: Métricas */}
              <div className="border-b md:border-b-0 md:border-r border-gray-800/60 pb-4 md:pb-0 md:pr-4 flex flex-col justify-between gap-3">
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
                  <div className="text-[9px] uppercase font-black text-gray-500 tracking-wider mb-1">Idioma</div>
                  <div className="text-xs font-bold text-gray-300">{drama.lang}</div>
                </div>
              </div>

              {/* Columna 2 y 3: Sinopsis */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase bg-blue-950 text-blue-400 px-2.5 py-1 rounded border border-blue-900/50">
                    {drama.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-3 tracking-tight">
                    {drama.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mt-2.5 bg-[#050608] p-3 rounded-xl border border-gray-900">
                    <strong className="text-blue-400 block text-[9px] uppercase tracking-wider mb-0.5">Sinopsis del misterio:</strong>
                    {drama.plot}
                  </p>
                </div>
              </div>

              {/* Columna 4: Redirección */}
              <div className="flex flex-col justify-center items-stretch pt-4 md:pt-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-800/60">
                <div className="text-center mb-3">
                  <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-wider">Encontrada en:</span>
                  <span className="text-xs font-black text-gray-300 block mt-0.5">{drama.platformName}</span>
                </div>
                
                <a 
                  href={drama.directUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-4 rounded-xl text-xs text-center transition-all shadow-md flex items-center justify-center gap-2 no-underline"
                >
                  <span>La puedes encontrar aquí</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
  )
}
