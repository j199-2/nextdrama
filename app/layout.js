import Script from 'next/script'

export const metadata = {
  title: 'NextGen DramaFinder',
  description: 'Ecosistema de Creadores',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Cargador oficial y seguro para Next.js */}
        <Script 
          src="https://cdn.tailwindcss.com" 
          strategy="beforeInteractive"
        />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#050608' }}>
        {children}
      </body>
    </html>
  )
}
