/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiDollarSign, FiMoreHorizontal } from "react-icons/fi";
import { useDashBoardQuery } from "../../hooks/useDashBoardQuery";


const AllTransaction = () => {

  const { data, isLoading } =useDashBoardQuery() 

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='col-span-12 rounded-xl border border-stone-300 bg-white/90 p-4 overflow-y-auto max-h-[400px]'>

      <div className="mb-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> Recent Transaction
        </h3>
      </div>

      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          {data?.recentTransaction.map((income:any, index:number) => (
            <TabelRow
              key={income._id}
              type={income.type}
              src={income.source}
              amt={income.amount}
              date={new Date(income.createdAt)}
              order={index + 1}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default AllTransaction;



const TableHead = () => {
    return <thead>
        <tr className='text-sm font-normal  text-stone-500 '>
            <th className="text-start p-1.5">Type</th>
            <th className="text-start p-1.5">Source</th>
            <th className="text-start p-1.5">Amount</th>
            <th className="text-start p-1.5">Date</th>
            <th className="w-8"></th>
        </tr>
    </thead>
}



interface Tabel {
    type: string,
    src: string,
    amt: number,
    date: Date,
    order: number
}

const TabelRow = ({type, src, amt, date, order }: Tabel) => {
    return <tr className ={`${order % 2 ? "bg-stone-100 text-sm rounded-lg":"text-sm"} border-b-8 border-transparent `}>
        <td className="p-1.5 rounded-l-lg">{type}</td>
        <td className="p-1.5">{src}</td>
        <td className="p-1.5">{amt}</td>
        <td className="p-1.5">{date.toLocaleDateString()}</td>
        <td className="p-1.5 text-right rounded-r-lg">
            <button className='hover:bg-stone-300 transition-colors grid place-content-center rounded size-8'>
                <FiMoreHorizontal />
            </button>
        </td>

    </tr>
}