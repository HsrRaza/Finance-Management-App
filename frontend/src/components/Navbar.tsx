import React from "react"
import { Link } from "react-router-dom"
import Buttons from "./Buttons"
import { IoIosArrowForward } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";


type NavLink = {
  href: string;
  title: string;
};


const headLinks: NavLink[] = [
  { href: "/home", title: "Home" },
  { href: "/about", title: "About Us" },
  { href: "/pricing", title: "Pricing" },
  { href: "/faq", title: "FAQ" },
  { href: "/contact", title: "Contact" }

]


const Navbar: React.FC = () => {
  return (



    <div className=" max-w-[90rem] flex  item-center justify-between  mx-auto py-4 px-2 ">
      <div className=" flex items-center gap-2">
        <GiTakeMyMoney className="text-white text-4xl"/>
        <h2 className="text-3xl font-bold text-white">  Trackify</h2>
      </div>

      {/* headings */}
      <div className=" flex items-center gap-8 ">
        {headLinks.map((item, index) => (
          <Link className="hover:text-blue-600 text-white  text-xl" key={index} to={item.href}>{item.title}</Link>
        ))}
      </div>



    
      {/* buttons */}

      <div className="flex items-center gap-4">
        <Buttons className="px-4 py-2">
          Login <IoIosArrowForward className="ml-1"/>
        </Buttons>
        <Buttons className="px-4 py-2 bg-white text-black  hover:text-white">
          Sign up <IoIosArrowForward className="ml-1"/>
        </Buttons>

      </div>

    </div>


  )
}

export default Navbar