
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false)

  window.addEventListener('scroll', () => {
    if(window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })
  
  return (
    <div className={isScrolled ? 'border-b' : ''}>

      <div className='max-w-7xl mx-auto'>
        <nav className="h-20 flex items-center justify-between px-8">

          <Link to="/" className="text-2xl font-black tracking-tight bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">FinTrackr</Link>
          <div className="flex items-center gap-6">
            <button className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              <Link to="/dashboard" className="">

                Get Started
              </Link>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar