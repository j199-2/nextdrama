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

    const prompt = `Actúa como un extractor avanzado y preciso de enlaces profundos (Deep Links) de miniseries y dramas web en formato vertical (9:16).
    Necesito un listado de series específicas que pertenezcan al nicho solicitado.
    
    Categoría solicitada: ${category}
    IDIOMA DE LA RESPUESTA: Todo el contenido (título, trama, categoría) DEBE estar escrito en ${targetLanguage}.

    REQUISITO CRÍTICO Y OBLIGATORIO DE URL ("directUrl"):
    Prohibido por completo colocar URLs de inicio como "https://goodshort.com" o "https://shortmax.tv".
    Debes estructurar enlaces largos, profundos y exactos que apunten directamente al reproductor o ficha del drama específico.
    
    Mira estos ejemplos de cómo DEBES estructurar la propiedad "directUrl" según la plataforma:
    - Si es de GoodShort: https://www.goodshort.com/es/books/nombre-del-drama-id
    - Si es de ShortMax: https://www.shortmax.tv/es/video/drama-slug-id
    - Si es de DramaBox: https://www.dramabox.com/episode/detail?id=12345&episode_id=1
    - Si es de YouTube: https://www.youtube.com/watch?v=id_del_video&list=id_playlist

    Asegúrate de rellenar los slugs o IDs con datos coherentes para simular el enlace profundo real de la serie que estás recomendando, asegurando que el usuario llegue directo al drama y no a la página principal.

    Devuelve la respuesta estrictamente en un formato JSON plano, un arreglo de objetos sin textos de introducción ni bloques markdown (absolutamente SIN \`\`\`json ni \`\`\`).
    [
      {
        "title": "Nombre específico de la serie o drama vertical",
        "category": "Categoría exacta",
        "plot": "Breve sinopsis o trama atractiva",
        "platformName": "Nombre del sitio web (ej: GoodShort, ShortMax, DramaBox, YouTube)",
        "freeEpisodes": "Número de capítulos gratis disponibles (ej: '5', '8', '12')",
        "directUrl": "URL_LARGA_Y_DEEP_LINK_DIRECTO_AL_DRAMA"
      }
    ]
    Genera exactamente entre 4 y 5 resultados de alta calidad.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', 
      messages: [
        { role: 'system', content: 'Eres una base de datos automatizada y estricta. Tu única función es responder con un arreglo JSON puro y plano, sin usar bloques de código markdown como \`\`\`json.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
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
