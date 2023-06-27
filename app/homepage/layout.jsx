import "@styles/globals.css"
import Navbar from "@components/Navbar"


export const metadata = {
    title: "Social Media Page",
    description: "Make your own social media page"
}

const RootLayout = ({ children }) => {

  return (
            <div>
                <Navbar/>
                {children}
            </div>
  )
}

export default RootLayout