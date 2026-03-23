import React from 'react'

const Text = () => {
  return (
    <div className='flex  flex-col items-center mt-20'>
        <h1 className='text-6xl leading-tight'>Magically simplify personal finance</h1>
        <p className='text-xl leading-normal mt-5 text-neutral-500'>Track expenses. Understand spending. Stay in control. <br /> Set up in 5 mins. Back to living by tonight.</p>
        <button className='bg-blue-500 text-white text-lg px-6 py-2 rounded-lg mt-7 hover:bg-blue-600'>Get Started</button>
    </div>
  )
}

export default Text