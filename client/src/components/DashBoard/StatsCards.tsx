
const StatsCards = () => {
    return (
        <>
        <Card/>
        <Card/>
        <Card/>
        </>
    )
}

export default StatsCards


const Card = () => {
    return (
        <div className='p-4 col-span-4 border border-stone-300'>
            <div className='flex mb-8 items-start justify-between'>
                <div>

                    <h3 className='text-stone-500 mb-2 text-sm'>Title</h3>
                    <p className='text-3xl  font-semibold'>Value</p>
                </div>
                <span>pillText</span>

            </div>
            <p className='text-xs text-stone-500'>period</p>



        </div>


    )
}