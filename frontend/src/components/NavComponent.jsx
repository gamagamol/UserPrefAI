import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect } from "react";
import { useSelector } from 'react-redux';
 


export default function NavComponent() {

    const preferences=useSelector((state)=>state.preferences)

    const [showDropdown, setDropDown] = useState(false);

    const handleDropDown = () => {
        if (showDropdown) {
            setDropDown(false)
        } else {
            setDropDown(true)
            
        }
    }


    useEffect(() => {
        if (preferences.isDarkTheme) {
      document.documentElement.classList.add('dark');
        } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.isDarkTheme]);


    return (
        <nav className="p-6 fixed  top-0 z-10 text-white border-gray-200 border-1 w-full flex justify-end dark:bg-black ">
            <span className='mr-5'>
            <FontAwesomeIcon icon={preferences.isEnabledNotification ? faBell : faBellSlash} className="text-black dark:text-white" />
            </span>
            <button className="bg-white  dark:bg-black dark:text-white text-black text-xl " onClick={handleDropDown} >Welcome Back gamagamol !</button>
            {showDropdown && (
                <div className="absolute right-0 mt-10 mr-5 w-40 bg-white shadow-md rounded text-end text-black  dark:bg-black dark:text-white">
                 <button className=" p-2 text-xl" >Logout</button>
                </div>
            )}
        </nav>
    )
}