import React from "react";



interface statsProps {
    total:number;
    weekly:number;
    today:number
}

const StatsCards = React.memo(({total , weekly, today}:statsProps) => {

  console.log(" status rendering");
    
    return (
        <>
            <Card title="Total Income" value={total}  variant="total"/>
            <Card title="Weekly Income" value={weekly}  variant = "weekly"/>
            <Card title="Today Income" value={today} variant = "today"/>
        </>
    )
})

export default StatsCards


const Card = ({ title, value ,variant}: { title: string, value: number,variant:"total" | "weekly" | "today"}) => {

    const formater = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

      const colorStyles = {
  total: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white",
  weekly: "bg-gradient-to-r from-cyan-500 to-sky-600 text-white",
  today: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
}
    return (
        <div className={`p-4 col-span-4 border border-stone-300  ${colorStyles[variant]} rounded-xl`}>
            <div className='flex mb-8 items-start justify-between'>
                <div>

                    <h3 className=' mb-2 text-sm'>{title}</h3>
                    <p className='text-3xl  font-semibold'>{formater.format(value)}</p>
                </div>
               

            </div>
            <p className='text-xs '>period</p>


        </div>



    )
}