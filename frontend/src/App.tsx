import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
function App() {


  return (
    <div className="w-[100vw] h-[100vh] bg-black m-0 p-0">
      <div className="border-b-1 border-neutral-700">
        <Navbar />
      </div>

      <Hero/>


    </div>

  )
}

export default App
