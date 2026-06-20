import type { Metadata } from "next"
import { Inter }         from "next/font/google"
import "./globals.css"
import { auth }          from "@/lib/auth"
import SessionProvider   from "@/components/SessionProvider"
import { Toaster }       from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title:       "Safarni — Your Travel Partner",
  description: "Book flights, hotels, tours & car rentals at the best prices",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-950 text-white antialiased`}>
        <SessionProvider session={session}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#1e2433", color: "#fff", border: "1px solid rgba(59,130,246,0.2)" },
              duration: 3000,
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}