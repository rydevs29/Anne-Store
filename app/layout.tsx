import './globals.css'
import { Playfair_Display } from 'next/font/google'

// Memanggil font yang elegan dan feminim dari Google
const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata = {
  title: 'Anne Store',
  description: 'Temukan Barang Favoritmu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      {/* Memasang font Playfair ke seluruh halaman */}
      <body className={`${playfair.className} text-dark-gray`}>
        {children}
      </body>
    </html>
  )
}
