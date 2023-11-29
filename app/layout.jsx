import './globals.css'

export const metadata = {
  title: 'Magic Post',
  description: 'Magic Post',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
