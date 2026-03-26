
import { useDashBoardQuery } from '../../hooks/useDashBoardQuery';





const DashBoardStatus = () => {

    const { data } = useDashBoardQuery()


    return (
        <>
            <Card title='Total Income' value={data?.totalIncome}    />
            <Card title='Total Expense' value={data?.totalExpense}    />
            <Card title='Total Balance' value={data?.totalBalance}    />
        </>
    )
}

export default DashBoardStatus


const Card = (
    { title, value }: { title: string, value: number }) => {

    const formater = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

  
    return (
        <div className={`p-4 col-span-4 border border-slate-200 rounded-xl bg-white/90`}>
            <div className='flex mb-8 items-start justify-between'>
                <div>

                    <h3 className='text-slate-800 mb-2 text-sm'>{title}</h3>
                    <p className='text-3xl  text-slate-800 font-semibold'>{formater.format(value)}</p>
                </div>
            

            </div>
            <p className='text-xs text-slate-800'>last 30 days</p>


        </div>



    )
}