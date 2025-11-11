import { Outlet } from "react-router-dom"
import SideMenu from "../components/SideBarMenu/SideMenu"
import { useState } from "react"
import { BsLayoutSidebar } from "react-icons/bs";


const MainLayouts: React.FC = () => {
    const [open, setOpen] = useState(true)
    return (
     



            <div className=" min-h-screen flex  text-stone-950 bg-stone-100">


                <div className={`fixed  top-0 left-0 h-screen w-[240px]   transform transition-transform duration-300 ${open ? "translate-x-0 " : "-translate-x-full "}  `}>

                    <aside>
                        <SideMenu />
                    </aside>


                </div >
                <div className={`flex-1 transition-all duration-300 ${open ? "ml-[240px]" : "ml-0"} `}>
                    <div className="bg-blue-500 text-stone-950 p-1 h-15 w-full ">
                        <button onClick={() => setOpen(!open)}>
                            <BsLayoutSidebar className="size-8 p-1 bg-stone-100 rounded " />
                        </button>
                    </div>
                    <main>
                        <Outlet />
                    </main>
                </div>

            </div>
    )
}

export default MainLayouts