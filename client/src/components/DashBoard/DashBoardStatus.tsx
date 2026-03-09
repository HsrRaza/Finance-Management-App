
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import useIncomeStore from '../../store/incomeStore';





const DashBoardStatus = () => {

    const totalIncome = useIncomeStore((state) => state.getTotalIncome());
    // const totalExpense = useExpenseStore((state) => state.getTotalExpense());

   

    return (
        <>
            <Card title='Total Income' value={totalIncome} pillText='12.5%' trend='up' />
            <Card title='Total Expense' value={0} pillText='12.5%' trend='down' />
        </>
    )
}

export default DashBoardStatus


const Card = ({ title, value, pillText, trend }: { title: string, value: number, pillText: string, trend: "up" | "down" }) => {

    const formater = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    return (
        <div className='p-4 col-span-6 border border-stone-300  bg-white/90 rounded-xl'>
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