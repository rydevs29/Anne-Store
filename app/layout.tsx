import './globals.css'

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
      <body className="bg-ivory text-dark-gray">{children}</body>
    </html>
  )
}
