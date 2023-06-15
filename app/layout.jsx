import "@styles/globals.css"

import Navbar from "@components/Navbar"
import Provider from "@components/Provider"

export const metadata = {
    title: "Social Media Page",
    description: "Make your own social media page"
}

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
        <body>
          <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
            <main className="app">
                <Navbar/>
                {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout