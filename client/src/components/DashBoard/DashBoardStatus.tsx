
import { useDashBoardQuery } from '../../hooks/useDashBoardQuery';





const DashBoardStatus = () => {

    const { data } = useDashBoardQuery()


    return (
        <>
            <Card title='Total Income' value={data?.totalIncome}   variant="income" />
            <Card title='Total Expense' value={data?.totalExpense}   variant="expense" />
            <Card title='Total Balance' value={data?.totalBalance}   variant="balance" />
        </>
    )
}

export default DashBoardStatus


const Card = (
    { title, value, variant }: { title: string, value: number, variant: "income" | "expense" | "balance" }) => {

    const formater = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

    const colorStyles = {

        income: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
        expense: "bg-gradient-to-r from-red-500 to-rose-600 text-white",
        balance: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    }
    return (
        <div className={`p-4 col-span-4 border border-slate-200 rounded-xl ${colorStyles[variant]}`}>
            <div className='flex mb-8 items-start justify-between'>
                <div>

                    <h3 className='text-slate-100 mb-2 text-sm'>{title}</h3>
                    <p className='text-3xl  text-white font-semibold'>{formater.format(value)}</p>
                </div>
            

            </div>
            <p className='text-xs text-slate-100'>last 30 days</p>


        </div>



    )
}