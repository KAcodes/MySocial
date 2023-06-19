import "@styles/globals.css"
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "@components/ProtectedRoute";


export const metadata = {
    title: "Social Media Page",
    description: "Make your own social media page"
}

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
        <body>
          <AuthContextProvider>
          <div className="main">
            <div className="gradient"></div>
          </div>
            <main className="app">
                {children}
            </main>
          </AuthContextProvider>
        </body>
    </html>
  )
}

export default RootLayout