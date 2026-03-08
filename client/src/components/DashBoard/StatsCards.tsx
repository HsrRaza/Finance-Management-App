import { FiTrendingDown, FiTrendingUp } from "react-icons/fi"

const StatsCards = () => {
    return (
        <>
            <Card title="Total Income" value={1000} pillText="+12.5%" trend="up" />
            <Card title="Total Expense" value={1000} pillText="+12.5%" trend="down" />
            <Card title="Total Expense" value={1000} pillText="+12.5%" trend="down" />
        </>
    )
}

export default StatsCards


const Card = ({ title, value, pillText, trend }: { title: string, value: number, pillText: string, trend: "up" | "down" }) => {
    return (
        <div className='p-4 col-span-4 border border-stone-300  bg-white/90 rounded-xl'>
            <div className='flex mb-8 items-start justify-between'>
                <div>

                    <h3 className='text-stone-500 mb-2 text-sm'>{title}</h3>
                    <p className='text-3xl  font-semibold'>{value}</p>
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