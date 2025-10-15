import Features from "./components/Features"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
function App() {


  return (
    <div className="w-full h-full bg-black m-0 p-0 box-border">
      <div className="border-b-1 border-neutral-700">
        <Navbar />
      </div>

      <Hero />
      <Features/>


    </div>

  )
}

export default App
