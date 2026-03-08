
import { FiDollarSign, FiMoreHorizontal } from "react-icons/fi"


const RecentTransaction = () => {
    return (
        <div className='col-span-12  rounded-xl  border border-stone-300'>
            <div className="mb-4 ">
                <h3 className="flex items-center gap-1.5 font-medium"><FiDollarSign /> Recent Transaction</h3>

            </div>
            <table className="w-full table-auto">
                <TableHead />
                <tbody>
                    <TabelRow
                        src="Freelance"
                        amt={78}
                        date={new Date(2026, 11, 8)}
                        order={1}
                    />
                    <TabelRow
                        src="Freelance"
                        amt={78}
                        date={new Date(2026, 11, 8)}
                        order={2}
                    />
                    <TabelRow
                        src="Freelance"
                        amt={78}
                        date={new Date(2026, 11, 8)}
                        order={3}
                    />
                    <TabelRow
                        src="Freelance"
                        amt={78}
                        date={new Date(2026, 11, 8)}
                        order={4}
                    />
                    <TabelRow
                        src="Freelance"
                        amt={78}
                        date={new Date(2026, 11, 8)}
                        order={5}
                    />



                </tbody>
            </table>

        </div>
    )
}



export default RecentTransaction



const TableHead = () => {
    return <thead>
        <tr className='text-sm font-normal  text-stone-500'>
            <th className="text-start p-1.5">Source</th>
            <th className="text-start p-1.5">Amount</th>
            <th className="text-start p-1.5">Date</th>
            <th className="w-8"></th>
        </tr>
    </thead>
}



interface Tabel {
    src: string,
    amt: number,
    date: Date,
    order: number
}

const TabelRow = ({ src, amt, date, order }: Tabel) => {
    return <tr className = {order % 2 ? "bg-stone-200 text-sm":"text-sm"}>
        <td className="p-1.5">{src}</td>
        <td className="p-1.5">{amt}</td>
        <td className="p-1.5">{date.toLocaleDateString()}</td>
        <td className="p-1.5"></td>
        <td className="w-4"></td>
        <button className='hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8'>
            <FiMoreHorizontal/>
        </button>

    </tr>
}