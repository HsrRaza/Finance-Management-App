import React from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoShield } from "react-icons/io5";
import { IoMdAnalytics } from "react-icons/io";
import { SlEnergy } from "react-icons/sl";
import { FaLock ,FaSync } from "react-icons/fa";


const Features:React.FC = () => {
    return (
        <div className=' max-w-[90rem] mx-auto  h-auto pt-6 mb-1'>

            <h2 className='text-center text-4xl font-bold text-neutral-100 mb-[25px]'>Everything You Need to
                <span className=''> Succeed   </span>
            </h2>
            <p className='text-center text-lg  text-neutral-500'>Powerful features designed to give you complete control over your financial journey</p>


            <div className='max-w-[70rem] mx-auto  mt-[55px]'>


                <div className='grid sm:grid-cols-3 gap-4  '>

                    {/* box-1 */}
                    <div className='bg-neutral-950   min-h-[150px] rounded-xl p-2 m-2'>
                        <FaArrowTrendUp className='text-4xl bg-neutral-50 rounded-lg p-1 m-2' />
                        <div className='p-2'>
                            <h3 className='text-xl font-bold text-neutral-100'>Track Income</h3>

                            <p className='text-md  text-neutral-500'>Monitor all your income sources in <br /> one place with detailed <br /> categorization and insights</p>
                        </div>

                    </div>

                    {/* box-2 */}
                    <div className='bg-neutral-950   min-h-[150px] rounded-xl p-2 m-2'>
                        <IoShield className='text-4xl bg-neutral-50 rounded-lg p-1 m-2' />
                        <div className='p-2'>
                            <h3 className='text-xl font-bold text-neutral-100'>Manage Expenses</h3>

                            <p className='text-md text-neutral-500'>Keep your spending under control <br /> with smart expense tracking and <br />budgeting tools</p>
                        </div>
                    </div>

                    {/* box-3 */}
                    <div className='bg-neutral-950   min-h-[150px] rounded-xl p-2 m-2'>
                        <IoMdAnalytics className='text-4xl bg-neutral-50 rounded-lg p-1 m-2' />
                        <div className='p-2'>
                            <h3 className='text-xl font-bold text-neutral-100'>Visual Insights</h3>

                            <p className='text-md text-neutral-500'>Beautiful charts and analytics to <br /> understand your financial health at <br /> a glance</p>
                        </div>
                    </div>


                    {/* box-4 */}

                    <div className='bg-neutral-950  min-h-[150px] rounded-xl p-2 m-2'>
                        <SlEnergy className='text-4xl bg-neutral-50 rounded-lg p-1 m-2 ' />
                        <div className='p-2'>
                            <h3 className='text-xl font-bold text-neutral-100'>Real-time Updates</h3>

                            <p className='text-md text-neutral-500'>See your financial data update <br /> instantly as you add transactions <br /> and make changes</p>
                        </div>
                    </div>

                    {/* box- 5  */}
                    <div className='bg-neutral-950  min-h-[150px] rounded-xl p-2 m-2'>
                        <FaLock className='text-4xl bg-neutral-50 rounded-lg p-1 m-2 ' />
                        <div className='p-2'>
                            <h3 className='text-xl font-bold text-neutral-100'>Secure & Private</h3>

                            <p className='text-md text-neutral-500'>Your financial data is encrypted and <br /> protected with enterprise-grade <br /> security</p>
                        </div>
                    </div>

                    {/* box- 6  */}
                    <div className='bg-neutral-950  min-h-[150px] rounded-xl p-2 m-2 '>
                        <FaSync className='text-4xl bg-neutral-50 rounded-lg p-1 m-2' />
                        <div className='p-2'>
                            <h3 className='text-xl font-bold text-neutral-100'>Auto Sync</h3>

                            <p className='text-md text-neutral-500'>Access your data from anywhere <br /> with automatic synchronization <br /> across devices</p>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Features