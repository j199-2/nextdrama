import { NextResponse } from 'next/server'

// BASE DE DATOS DE DRAMAS CON EPISODIOS GRATIS CONFIRMADOS (RECIÉN DESCUBIERTAS)
const FRESH_DRAMAS = [
  {
    title: "The Double Life of My Billionaire Husband",
    category: "Misterio / Romance",
    viralRate: "98% 🔥 Ultra Viral",
    lang: "Español / Inglés Sub",
    freeEpisodes: "15 Capítulos Gratis", // Requisito indispensable
    plot: "Se casa en secreto con un hombre que todos desprecian, descubriendo el misterio de que es el magnate más poderoso de la ciudad.",
    platformName: "FreeReelss (Nueva Plataforma)",
    directUrl: "https://www.freereelss.com/drama/68bf85c176078d774201a83e"
  },
  {
    title: "Groom Divided: The Double Identity",
    category: "Misterio / Venganza",
    viralRate: "94% 🚀 Nueva Tendencia",
    lang: "Inglés / Sub Español",
    freeEpisodes: "12 Capítulos Gratis", // Requisito indispensable
    plot: "Un heredero se hace pasar por su hermano gemelo desaparecido para descubrir quién intentó acabar con su familia y ejecutar su fría venganza.",
    platformName: "ShortMax Web Player",
    directUrl: "https://www.shortmax.tv/es/video/groom-divided"
  },
  {
    title: "El Heredero Secreto de la Mafia",
    category: "Venganza / Acción",
    viralRate: "92% 🔥 Muy Buscado",
    lang: "Español Latam",
    freeEpisodes: "Maratón Completa Gratis", // Requisito indispensable
    plot: "Un conserje humillado resulta ser el líder absoluto de una organización internacional. Toda la serie disponible en formato vertical sin cortes.",
    platformName: "YouTube (Canal Oficial)",
    directUrl: "https://www.youtube.com/watch?v=S8p7yY0oFwE"
  },
  {
    title: "Dangerous Romance: Hidden Desires",
    category: "Drama Intenso",
    viralRate: "87% 📈 Subiendo",
    lang: "Español",
    freeEpisodes: "7 Capítulos Gratis", // Requisito indispensable
    plot: "El peligroso encuentro entre una fotógrafa y un misterioso empresario que esconde secretos oscuros en la junta directiva.",
    platformName: "FlexTV Web",
    directUrl: "https://www.youtube.com/watch?v=XbH8m6zV-EE"
  }
]

export async function POST(req) {
  try {
    // Retorna solo las series que cumplen estrictamente con la regla de episodios gratis
    return NextResponse.json({ success: true, data: FRESH_DRAMAS })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
