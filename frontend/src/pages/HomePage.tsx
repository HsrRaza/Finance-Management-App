import React from 'react'
import Hero from '../components/Hero'
import  Features  from '../components/Features'
import Words from '../components/Words'
import Pricing from '../components/Pricing'
import Navbar from '../components/Navbar'

const HomePage:React.FC = () => {
  return (
     <div className="w-full h-full bg-black m-0 p-0 box-border">
      <div className="border-b-1 border-neutral-700">
        <Navbar />
      </div>

      <Hero />
      <Features/>
      <Words />
      <Pricing />
      

      



    </div>

  )
}

export default HomePage