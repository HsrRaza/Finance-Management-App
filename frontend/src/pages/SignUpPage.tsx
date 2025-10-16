import React from 'react'
import Button from "../components/Buttons"
import { GiTakeMyMoney } from "react-icons/gi";

const SignUpPage: React.FC = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>


      <div className='bg-black p-5 flex flex-col gap-4 min-w-[25rem] rounded-xl border border-neutral-800'>
        <div className='mb-2 text-center' >
          <h3 className='text-5xl font-bold mb-4 text-neutral-100 flex justify-center'><GiTakeMyMoney className='text-7xl' /></h3>
          <h3 className='text-3xl text-neutral-100 font-bold'> Start your Free Trail</h3>
          <p className='text-neutral-500 mt-2'>Sign up in less than 2 minutes.</p>
        </div>
        <div className='border border-neutral-800 mb-2'></div>

        <div className='  border border-neutral-800 rounded-xl'>
          <input type="text"
            className='px-4 py-2 border-none outline-none text-neutral-100 placeholder-neutral-100'
            placeholder='Enter your name' />
        </div>

        <div className=' border border-neutral-800 rounded-xl'>
          <input type="text"
            className='px-4 py-2 border-none outline-none text-neutral-100 placeholder-neutral-100'
            placeholder='Enter your email' />
        </div>

        <div className=' border border-neutral-800 rounded-xl'>
          <input type="text"
            className='px-4 py-2 border-none outline-none text-neutral-100 placeholder-neutral-100'
            placeholder='Enter your password' />
        </div>

        <div className='mt-2 py-2 w-full flex flex-col items-center justify-center '>
          <Button className='w-full px-4 py-2 flex justify-center bg-neutral-100 text-black'>
            Create an Account
          </Button>

          <p className='mt-4 text-sm text-neutral-500  cursor-pointer'>Already have an account?Log in  </p>
        </div>
      </div>

    </div>
  )
}

export default SignUpPage