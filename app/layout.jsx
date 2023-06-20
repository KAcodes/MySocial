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
            <main >
                {children}
            </main>
          
            
          </AuthContextProvider>
        </body>
    </html>
  )
}

export default RootLayout