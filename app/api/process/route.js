import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, 
  baseURL: "https://api.groq.com/openai/v1" 
})

export async function POST(req) {
  try {
    const { category, lang } = await req.json()

    const targetLanguage = lang === 'en' ? 'INGLÉS (English)' : 'ESPAÑOL';

    const prompt = `Actúa como un rastreador experto de miniseries y dramas en formato vertical para creadores de contenido. 
    Necesito un listado de series o canales específicos dentro de páginas web que permitan ver el contenido ONLINE (en navegadores de escritorio/móvil) SIN descargar aplicaciones móviles, de manera que se les pueda hacer grabación de pantalla.
    
    Categoría solicitada: ${category}
    IDIOMA ESTRICTO PARA LA RESPUESTA: Todo el contenido (título, categoría, trama) DEBE estar escrito en ${targetLanguage}.

    Requisitos estrictos del contenido:
    1. Formato vertical (9:16) ideal para TikTok, Reels o Shorts.
    2. Duración de episodios menor a 25 minutos.
    3. Deben tener episodios GRATIS disponibles directamente en su versión web (indica cuántos).
    4. Utiliza plataformas conocidas que tengan visor web como netshort.com, goodshort.com, stardusttv.net, flickreels.net o canales de YouTube/Dailymotion.

    Devuelve la respuesta estrictamente en un formato JSON plano, que sea un arreglo de objetos sin textos extras antes ni después (sin markdown, sin \`\`\`json). Cada objeto debe tener exactamente estas propiedades:
    [
      {
        "title": "Nombre de la serie o drama (en el idioma solicitado)",
        "category": "Categoría exacta (en el idioma solicitado)",
        "plot": "Breve sinopsis de qué trata la historia (en el idioma solicitado)",
        "platformName": "Nombre del sitio web original",
        "freeEpisodes": "Número exacto de capítulos gratis (ej: '5', '7', '10')",
        "directUrl": "Enlace URL web real y directo para abrir y ver en el navegador"
      }
    ]
    Genera entre 4 y 5 resultados reales de alta calidad.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', 
      messages: [
        { role: 'system', content: 'Eres un sistema de base de datos automatizado que solo responde en formato JSON puro, sin decoradores markdown.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
    })

    const rawText = completion.choices[0].message.content.trim()
    
    const cleanJson = rawText.replace(/^```json/, '').replace(/```$/, '').trim()
    const parsedData = JSON.parse(cleanJson)

    return NextResponse.json({ success: true, data: parsedData })

  } catch (error) {
    console.error("Groq API Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
