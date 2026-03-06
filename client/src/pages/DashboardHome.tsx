const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((card) => (
          <div key={card} className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">$24,500</p>
            <div className="mt-4 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded inline-block">
              +12.5% vs last month
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white border border-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-400 italic">
        Chart placeholder...
      </div>
    </div>
  );
};

export default DashboardHome;