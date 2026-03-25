

const Features = () => {


    return (
        <div className="grid md:grid-cols-3 gap-6 mt-12" >

            <div className="  rounded-b-xl  shadow-lg" >
                <div className="bg-blue-500 rounded-b-xl h-20 w-full  p-2">

                    <h3 className="font-semibold text-white md:text-xl" > Smart Expense Tracking </h3>
                </div>
                <div className=" p-2" >

                    < p className="text-gray-500 mt-2 md:text-lg leading-relaxed" > Track every rupee without friction.
                        Log, categorize, and review your expenses with clean tables and real-time updates.</p>
                </div>
            </div>

            <div className="  rounded-b-xl  shadow-lg" >
                <div className="bg-blue-500 rounded-b-xl h-20 w-full  p-2">

                    <h3 className="font-semibold text-white md:text-xl" > Income Management </h3>
                </div>
                <div className=" p-2" >

                    < p className="text-gray-500 mt-2 md:text-lg leading-relaxed" >  Keep your earnings organized and visible.
                        Add multiple income sources and understand your cash flow at a glance.</p>
                </div>
            </div>

            <div className="  rounded-b-xl  shadow-lg" >
                <div className="bg-blue-500 rounded-b-xl h-20 w-full  p-2">

                    <h3 className="font-semibold text-white md:text-xl" >Visual Financial Insights </h3>
                </div>
                <div className=" p-2" >

                    < p className="text-gray-500 mt-2 md:text-lg leading-relaxed" >  Turn numbers into clarity.
                        Interactive charts (powered by Recharts) show your spending patterns instantly.</p>
                </div>
            </div>
        </div>
    )
}

export default Features