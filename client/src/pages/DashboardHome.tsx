import StatsCards from "../components/DashBoard/StatsCards";

const DashboardHome = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Overview</h1>
      <div className="grid grid-cols-12 gap-6">
        <StatsCards/>
        
      </div>
      
      <div className="mt-8 bg-white border border-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-400 italic">
        Chart placeholder...
      </div>
    </div>
  );
};

export default DashboardHome;