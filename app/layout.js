export const metadata = {
  title: 'NextGen DramaFinder',
  description: 'Ecosistema de Creadores',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Esto carga todo el motor de diseño de Tailwind de golpe */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#050608' }}>
        {children}
      </body>
    </html>
  )
}
