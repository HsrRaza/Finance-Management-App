import Features from "./components/Features"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Pricing from "./components/Pricing"
import Words from "./components/Words"
function App() {


  return (
    <div className="w-full h-full bg-black m-0 p-0 box-border">
      <div className="border-b-1 border-neutral-700">
        <Navbar />
      </div>

      <Hero />
      <Features/>
      <Words/>
      <Pricing/>


    </div>

  )
}

export default App
