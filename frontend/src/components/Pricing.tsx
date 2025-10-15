import React from 'react'
import { LuBadgeCheck } from "react-icons/lu";
import Button from './Buttons';
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";
import { IoIosBusiness } from "react-icons/io";


const Pricing: React.FC = () => {
    return (
        <div className='max-w-[70rem] mx-auto h-[700px]  mt-2'>

            <div className='sm:grid grid-cols-3 gap-4 '>


                <div className='h-full flex flex-col   p-4 border border-neutral-700'>
                    <span className='text-xl mb-2 text-neutral-500 flex items-center gap-1 '> <IoPaperPlaneOutline className='text-2xl'/> Basic Plan</span>
                    <p className='text-neutral-600 text-lg'> <span className='text-5xl text-neutral-100'>$19</span> /mo</p>
                    <p className='mt-5 text-neutral-500'> or $199 yearly</p>
                    <div className='border border-neutral-500 mt-2 mb-[20px]'></div>
                    <h3 className='text-neutral-600 text-xl'>Features Included</h3>


                    <span className="text-lg m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> Expense & income tracking
                    </span>
                   
                    <span className="text-lg m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> Budget planning
                    </span>
                    <span className="text-lg m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> Category-based reports
                    </span>
                    <span className="text-lg m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2  text-2xl" />Monthly spending summary
                    </span>


                  
                    <Button className='w-full px-4 py-2  mt-7 flex justify-center  '>Get Started</Button>

                    
                </div>

                {/* box -2 */}
                <div className='h-full flex flex-col p-4 border border-neutral-700'>
                    <span className='text-xl mb-2 text-neutral-500  flex items-center gap-1'><MdBusinessCenter className='text-2xl'/> Business Plan</span>
                    <p className='text-neutral-600 text-lg'> <span className='text-5xl text-neutral-100'>$29</span> /mo</p>
                    <p className='mt-5 text-neutral-500'> or $299 yearly</p>
                    <div className='border border-neutral-500 mt-2 mb-[20px]'></div>
                    <h3 className='text-neutral-600 text-xl'>Features Included</h3>


                    <span className="text-lg m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> Invoice and billing tracking
                    </span>
                   
                    <span className="text-lg m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> Tax-ready financial reports
                    </span>
                    <span className="text-lg m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> Goal-based savings planner
                    </span>
                    <span className="text-lg m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2  text-2xl" /> Advanced analytics dashboard
                    </span>


                  
                    <Button className='w-full px-4 py-2  mt-7 flex justify-center  '>Get Started</Button>

                </div>
                {/* box-3 */}
                    
                <div className='h-full flex flex-col  p-4 border border-neutral-700'>
                   <span className='text-xl mb-2 text-neutral-500  flex items-center gap-1'><IoIosBusiness className='text-2xl'/> Enterprise Plan</span>
                    <p className='text-neutral-600 text-lg'> <span className='text-5xl text-neutral-100'>$49</span> /mo</p>
                    <p className='mt-5 text-neutral-500'> or $499 yearly</p>
                    <div className='border border-neutral-500 mt-2 mb-[20px]'></div>
                    <h3 className='text-neutral-600 text-xl'>Features Included</h3>


                    <span className="text-md m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> AI-powered financial forecasting
                    </span>
                   
                    <span className="text-md m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> Secure data backup and encryption
                    </span>
                    <span className="text-md m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2 text-2xl" /> Payroll and reimbursement management
                    </span>
                    <span className="text-md m-1 mb-3 text-neutral-400 flex items-center">
                        <LuBadgeCheck className="mr-2  text-2xl" /> Audit logs & compliance tracking
                    </span>


                  
                    <Button className='w-full px-4 py-2  mt-7 flex justify-center  '>Get Started</Button>

                    
                </div>









            </div>

        </div>
    )
}

export default Pricing