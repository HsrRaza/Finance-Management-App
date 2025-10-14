import React from 'react'
import Button from './Buttons'
import { IoIosArrowForward } from "react-icons/io";

const Hero:React.FC = () => {
  return (
    <div className='max-w-[90rem] mx-auto h-[450px] flex flex-col items-center justify-center pt-5 '>
        <h1 className='text-white font-bold text-6xl leading-[70px] text-center mb-7 '>Control Your Finances <br /> Effortlessly</h1 >
        <p className='text-white text-center leading-[25px] mb-3'>Streamline tracking, manage spending, and stay on top of your <br /> finances with powerful insights.</p>

     <Button className=' px-6 py-2 mt-6 bg-white text-black border-0 outline-0 hover:bg-blue-600 hover:text-white'>
      Get Started  <IoIosArrowForward className='ml-1 text-xl' />
     </Button>

    </div>
  )
}

export default Hero