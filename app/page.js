// TRUCO CRÍTICO: Esta línea mantiene el formato fijo y evita que se rompa la estructura
import './globals.css'
import { useState } from 'react'

export default function Home() {
  const [category, setCategory] = useState('')
  const [lang, setLang] = useState('es')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: 'romance', name: 'Romance / Amor', icon: '❤️' },
    { id: 'venganza', name: 'Venganza', icon: '⚔️' },
    { id: 'millonarios', name: 'Millonarios / CEOs', icon: '💰' },
    { id: 'drama', name: 'Drama Intenso', icon: '🎭' },
    { id: 'accion', name: 'Acción / Suspenso', icon: '🔥' }
  ]

  const handleSearch = async (selectedCat) => {
    setCategory(selectedCat)
    setLoading(true)
    setResults([])

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCat, lang })
      })
      const json = await response.json()
      if (json.success) {
        setResults(json.data)
      } else {
        alert('Error al buscar dramas')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen text-white font-sans p-6" style={{ backgroundColor: '#050608' }}>
      {/* Encabezado */}
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
            NEXTGEN DRAMAFINDER
          </h1>
          <p className="text-gray-400 text-sm mt-1">Ecosistema de Creadores</p>
        </div>

        {/* Selector de Idioma */}
        <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
          <button 
            onClick={() => setLang('es')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${lang === 'es' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            ESP
          </button>
          <button 
            onClick={() => setLang('en')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            ENG
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Sección de Categorías */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-gray-200">Selecciona una Categoría:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSearch(cat.name)}
                disabled={loading}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  category === cat.name 
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10' 
                    : 'bg-gray-900/50 border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-gray-900'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Estado de Carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-400 animate-pulse">Buscando los mejores dramas verticales en la web...</p>
          </div>
        )}

        {/* Resultados */}
        <section className="grid md:grid-cols-2 gap-6">
          {results.map((drama, idx) => (
            <div key={idx} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-700 transition-all">
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{drama.title}</h3>
                  <span className="bg-blue-900/40 text-blue-400 text-[10px] uppercase font-extrabold px-2 py-1 rounded border border-blue-800/50 whitespace-nowrap">
                    {drama.platformName || 'Web'}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">{drama.plot}</p>
                <div className="text-[11px] text-gray-500 flex gap-4 mb-6">
                  <span><strong>Categoría:</strong> {drama.category}</span>
                  <span><strong>Capítulos Gratis:</strong> {drama.freeEpisodes || 'N/A'}</span>
                </div>
              </div>

              {/* Botón con Enlace Profundo Directo */}
              <a 
                href={drama.directUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs text-center transition-all shadow-md hover:shadow-blue-600/20"
              >
                Ver Drama en la Web
              </a>
            </div>
          ))}
        </section>

        {/* Aviso de Grabación - Informativo abajo */}
        {results.length > 0 && (
          <div className="mt-12 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start max-w-2xl mx-auto">
            <span className="text-amber-500 text-lg">💡</span>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              <strong>Consejo de Creador:</strong> Utiliza una herramienta de grabación de pantalla al abrir el drama para capturar los fragmentos más impactantes de los episodios gratuitos y utilizarlos en tu estrategia de contenido.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
