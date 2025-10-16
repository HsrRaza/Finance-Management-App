import React, { useState } from "react"
import { Link } from "react-router-dom"
import Buttons from "./Buttons"
import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { GiHamburgerMenu, GiTakeMyMoney } from "react-icons/gi";


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

  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (



    <div className=" max-w-[90rem] flex  items-center justify-between  mx-auto py-4 px-2 ">
      <div className=" flex items-center gap-2">
        <GiTakeMyMoney className="text-white text-4xl" />
        <h2 className="text-3xl font-bold text-white">  Trackify</h2>
      </div>

      {/* headings */}
      <div className="hidden md:flex items-center gap-8 ">
        {headLinks.map((item, index) => (
          <Link className="hover:text-blue-600 text-white  text-xl" key={index} to={item.href}>{item.title}</Link>
        ))}
      </div>




      {/* buttons */}

      <div className=" hidden md:flex items-center gap-4">
        <Link to={"/login"} >
          <Buttons className="px-4 py-2  ">
            Login  <IoIosArrowForward className="ml-1" />
          </Buttons>
        </Link>

        <Link to={"/sign"} className="flex items-center">
          <Buttons className="px-4 py-2 bg-white text-black  hover:text-white">
            SignUp <IoIosArrowForward className="ml-1" />
          </Buttons>
        </Link>

      </div>

      <Buttons className="md:hidden text-white text-3xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
      </Buttons>

      {isOpen && (
        <div className="md:hidden w-full px-4 py-4 flex flex-col gap-4">
          {headLinks.map((item, index) => (
            <Link key={index} className="text-white text-lg" to={item.href}>
            {item.title}
            </Link>
          ))}
        </div>
      )}

    </div>


  )
}

export default Navbar