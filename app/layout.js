import './globals.css'


export const metadata = {
  title: 'TaxWizard',
  description: 'Web-based Tax Calculator',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en" className='h-screen'>
        <body>
          {children}
          </body>
      </html>
  )
}
