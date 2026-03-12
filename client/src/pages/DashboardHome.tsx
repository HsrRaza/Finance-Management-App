import AllTransaction from "../components/DashBoard/AllTransaction";
import { DashboardGraph } from "../components/DashBoard/DashboardGraph";
import DashBoardStatus from "../components/DashBoard/DashBoardStatus";



const DashboardHome = () => {

  
  return (

    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Overview</h1>
      <div className="grid grid-cols-12 gap-6">
     <DashBoardStatus/>
        
      </div>
      
      {/* <div className="mt-8 mb-6 bg-white border border-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-400 italic">
        Chart placeholder...
      </div> */}
      <DashboardGraph/>
      <AllTransaction/>
    </div>
  );
};

export default DashboardHome;