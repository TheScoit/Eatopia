import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";



const  Footer = () => {
  return (
    <footer className="bg-gray-800 text-center text-gray-300 py-8 px-4">
      <div className=" h-36 w-full mx-auto mb-4 flex flex-row-3">
       <div className="w-1/2  h-full">
       <span className="text-2xl mr-60 text-white font-black">PashaEats </span>
       </div>
       <div className="w-1/2  h-full flex justify-around text-center flex-row-2 ">
       <ul>
        <li className="mb-2 hover:text-white cursor-pointer">About Us</li>
        <li className="mb-2 hover:text-white cursor-pointer">Contact</li>
        <li className="mb-2 hover:text-white cursor-pointer">Privacy Policy</li>
        <li className="mb-2 hover:text-white cursor-pointer">Terms of Service</li>
       </ul>
       <ul>
        <li className="mb-2 hover:text-white cursor-pointer">FAQs</li>
        <li className="mb-2 hover:text-white cursor-pointer">Restaurants</li>
        <li className="mb-2 hover:text-white cursor-pointer">Careers</li>
        <li className="mb-2 hover:text-white cursor-pointer">Offers / Trending</li>
       </ul>
       </div>
       <div className="w-1/2 h-full ">
        <span className="text-lg text-white font-black">Follow Us</span>
        <div className="flex ml-36 items-center gap-10 mt-2">
       <Link to={'/'}><FaFacebook size={25}/></Link>
       <Link to={'/'}><FaTwitter size={25}/></Link>
       <Link to={'/'}><FaInstagram size={25}/></Link>
       </div>
       </div>
      </div>
      <div className="border"></div>
      <p className="text-sm mt-5">
        &copy; 2025 PashaEats. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
