import './globals.css'

export const metadata = {
  title: 'The Drama Journal',
  description: 'NextGen Creators Radar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-[#050608]">{children}</body>
    </html>
  )
}
