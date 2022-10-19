import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";


const Header = () => {

    const [ scroll, setScroll ] = useState(true)
    
    useEffect( () => {
        const handleScroll = () => {
            if ( window.scrollY > 4 ) {
              setScroll(true)
            } else (
                setScroll(false)
          )
        }
        
        window.addEventListener( 'scroll', handleScroll )
        
        return () => {
            window.removeEventListener('scroll',  handleScroll)
        }
  }, [])
    

    return (
     <header className={`${scroll && 'bg-[#141414]' }`}>
      <div className="flex space-x-2 md:space-x-10 ">
       <img
        src="https://rb.gy/ulxxee"
        width={100}
        height={100}
        className="cursor-pointer object-contain"
        alt="logo"
       />
       <ul className="hidden space-x-4 md:flex">
        <li className="nav-link">Home</li>
        <li className="nav-link">Tv Series</li>
        <li className="nav-link">Movies</li>
        <li className="nav-link">New & Popular</li>
        <li className="nav-link">My List</li>
       </ul>
      </div>
      <div className="flex items-center space-x-3 text-sm font-light">
       <MagnifyingGlassIcon className="hidden sm:inline w-6 h-6" />
       <p className="hidden lg:inline">Kids</p>
       <BellIcon className="w-6 h-6" />
       <Link href='/account' >
            <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
       </Link>
      </div>
     </header>
    );
}
 
export default Header;