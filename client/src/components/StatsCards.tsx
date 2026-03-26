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
            <Card title="Total Income" value={total}  />
            <Card title="Weekly Income" value={weekly}  />
            <Card title="Today Income" value={today} />
        </>
    )
})

export default StatsCards


const Card = ({ title, value }: { title: string, value: number}) => {

    const formater = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

  
    return (
        <div className={`p-4 col-span-4 border border-stone-300  bg-white/90  rounded-xl`}>
            <div className='flex mb-8 items-start justify-between'>
                <div>

                    <h3 className=' mb-2 text-sm text-slate-800'>{title}</h3>
                    <p className='text-3xl  font-semibold text-slate-800'>{formater.format(value)}</p>
                </div>
               

            </div>
            <p className='text-xs '>period</p>


        </div>



    )
}