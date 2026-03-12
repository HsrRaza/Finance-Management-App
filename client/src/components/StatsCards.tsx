import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi"



interface statsProps {
    total:number;
    weekly:number;
    today:number
}

const StatsCards = React.memo(({total , weekly, today}:statsProps) => {

  console.log(" status rendering");
    
    return (
        <>
            <Card title="Total Income" value={total} pillText="+12.5%" trend="up" />
            <Card title="Weekly Income" value={weekly} pillText="+12.5%" trend="down" />
            <Card title="Today Income" value={today} pillText="+12.5%" trend="down" />
        </>
    )
})

export default StatsCards


const Card = ({ title, value, pillText, trend }: { title: string, value: number, pillText: string, trend: "up" | "down" }) => {

    const formater = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    return (
        <div className='p-4 col-span-4 border border-stone-300  bg-white/90 rounded-xl'>
            <div className='flex mb-8 items-start justify-between'>
                <div>

                    <h3 className='text-stone-500 mb-2 text-sm'>{title}</h3>
                    <p className='text-3xl  font-semibold'>{formater.format(value)}</p>
                </div>
                <span className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {pillText}
                    {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
                </span>

            </div>
            <p className='text-xs text-stone-500'>period</p>


        </div>



    )
}