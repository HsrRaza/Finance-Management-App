import { useMemo, useState, type FormEvent } from "react"
import { type Income } from "../types/income";
import { Graph } from "../components/DashBoard/Graph";
import RecentTransaction from "../components/DashBoard/RecentTransaction";
import StatsCards from "../components/DashBoard/StatsCards";
import { useIncomeQuery } from "../hooks/useIncomeQuery";
import { useAddIncome } from "../hooks/useIncomeMutation";







interface IncomeFormData {
  amount: string;
  description: string;
}

const IncomePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<IncomeFormData>({
    amount: "",
    description: ""
  })



  // const total = useIncomeStore((state) => state.getTotalIncome());

  const { data: income = [] } = useIncomeQuery()
  const addIncomeMutation = useAddIncome()


  const { weekly, today, total } = useMemo(() => {

    const now = new Date();
    const todayStr = now.toDateString();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));


    return {
      today: (income as Income[])
        .filter((i: Income) => new Date(i.createdAt).toDateString() === todayStr)
        .reduce((acc: number, curr: Income) => acc + Number((curr.amount) || 0), 0),

      weekly: (income as Income[])
        .filter((i: Income) => new Date(i.createdAt) >= sevenDaysAgo)
        .reduce((acc: number, curr: Income) => acc + (Number(curr.amount) || 0), 0),

      total: (income as Income[]).reduce((acc: number, curr: Income) => acc + (Number(curr.amount) || 0), 0)

    }


  }, [income])



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {


    const { name, value } = e.target
    console.log(name, value)

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))


  }



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    const finalAmount = parseFloat(formData.amount);
    console.log("submitting :", { ...formData, amount: finalAmount });


    if (!finalAmount || finalAmount <= 0 || !formData.description) {
      return
    }

    // tanstacKQuery 
    await addIncomeMutation.mutate({
      source: formData.description,
      amount: finalAmount,
    })


    setIsModalOpen(false);
    setFormData({ amount: "", description: "" });



  }

  return (
    <div className="relative min-h-screen ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">System Overview</h1>
        <button
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-slate-800 hover:text-white transition-all active:scale-95"
          onClick={() => setIsModalOpen(true)}
        >
          {addIncomeMutation.isPending ? "saving" : "Save Income"}
        </button>
      </div>
      {addIncomeMutation.error && (
        <p className="text-red-500">{addIncomeMutation.error.message}</p>
      )}

      {/* --- POP-UP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 1. Dark Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* 2. The Form Card */}
          <div className="relative bg-stone-200 p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 ">Add Income</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  name="amount"
                  autoFocus
                  type="number"
                  placeholder="$0.00"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  name="description"
                  type="text"
                  placeholder="e.g. Freelance project"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {addIncomeMutation.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                  {addIncomeMutation.error.message}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addIncomeMutation.isPending}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addIncomeMutation.isPending ? "Saving..." : "Save Income"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* <div className={`grid grid-cols-12 gap-6 `}>
        {[1, 2, 3].map((card) => (
          <div key={card} className="col-span-4 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">$24,500</p>
            <div className="mt-4 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded inline-block">
              +12.5% vs last month
            </div>
          </div>
        ))}
      </div> */}


      <div className="mt-5 grid grid-cols-12 gap-6 ">
        <StatsCards total={total} weekly={weekly} today={today} />
        <Graph />
        <RecentTransaction />
      </div>


    </div>
  )
}

export default IncomePage