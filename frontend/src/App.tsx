


import { Routes, Route } from "react-router-dom"


import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
function App() {


  return (
    <div className=" bg-black m-0 p-0 box-border">
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign" element={<SignUpPage />} />
      </Routes>



    </div>


  )
}

export default App
