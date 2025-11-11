
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayouts from "./layouts/MainLayouts"
import DashBoardPage from "./pages/DashBoardPage"
import { IncomePage } from "./pages/IncomePage"


function App() {


  return (

      <>

      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<MainLayouts />}>
            <Route index element={<DashBoardPage/>} />
            <Route path="/dashboard/income" element={<IncomePage />} />
          </Route>
        </Routes>

      </BrowserRouter>

      </>


  )
}

export default App
