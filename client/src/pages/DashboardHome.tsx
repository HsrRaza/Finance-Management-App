import AllTransaction from "../components/DashBoard/AllTransaction";
import { DashboardGraph } from "../components/DashBoard/DashboardGraph";
import DashBoardStatus from "../components/DashBoard/DashBoardStatus";



const DashboardHome = () => {

  
  return (

    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Overview</h1>
      <div className="grid grid-cols-12 gap-6">
     <DashBoardStatus/>
        
    
      <DashboardGraph/>
      <AllTransaction/>
      </div>
    </div>
  );
};

export default DashboardHome;