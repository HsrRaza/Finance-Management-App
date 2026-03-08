/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FormEvent } from "react"
import { addIncome } from "../api/income.api";
import { Graph } from "../components/DashBoard/Graph";
import RecentTransaction from "../components/DashBoard/RecentTransaction";
import StatsCards from "../components/DashBoard/StatsCards";



interface IncomeFormData {
  amount: string;
  description: string;
}

const IncomePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<IncomeFormData>({
    amount: "",
    description: ""
  })




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))


  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    setErr("")
    e.preventDefault()

    const finalAmount = parseFloat(formData.amount);
    console.log("submitting :", { ...formData, amount: finalAmount });


    if (!finalAmount || finalAmount <= 0) {
      setErr("Please enter a valid amount")
      return
    }

    if (!formData.description) {
      setErr("Please enter a description")
      return
    }


    try {

      const income = await addIncome(formData.description, finalAmount)
      console.log("income added :", income.amount, income.source);
      setIsModalOpen(false)
      setFormData({
        amount: "",
        description: ""
      })

    } catch (err: unknown) {
      if (err instanceof Error) {
        setErr(err.message)
      }

    } finally {
      setLoading(false)
    }


  }



  return (
    <div className="relative min-h-screen ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">System Overview</h1>
        <button
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-slate-800 hover:text-white transition-all active:scale-95"
          onClick={() => setIsModalOpen(true)}
        >
          Add Income
        </button>
      </div>

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
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200"
                >
                  Save Income
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
        <StatsCards/>
        <Graph />
        <RecentTransaction/>
      </div>


    </div>
  )
}

export default IncomePage