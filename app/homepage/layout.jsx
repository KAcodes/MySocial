import "@styles/globals.css"
import Navbar from "@components/Navbar"


export const metadata = {
    title: "Social Media Page",
    description: "Make your own social media page"
}

const RootLayout = ({ children }) => {

  return (
    
          <>
          <div className="main">
            <div className="gradient"></div>
          </div>
            <div className="app">
                <Navbar/>
                {children}
            </div>
          </>
      
  )
}

export default RootLayout