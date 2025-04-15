
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/AuthSlice';
import { updatePreferences } from '../features/PreferencesSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [loginErr, setLoginErr] = useState({
      isErr: false,
      message:""
    })
  const dispatch = useDispatch();
   const navigate = useNavigate();
  
  
  

  const HandleLogin = () => {
    
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const apiUrl = process.env.VITE_URL_BACKEND;



    axios.post(`${apiUrl}/login`, {
      username,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }).then((response) => {

      axios.get(`${apiUrl}/preferences`, {
        withCredentials: true
      }).then((response) => {
        dispatch(updatePreferences(response.data.payload.Prefrences))
        dispatch(login({ username: response.data.payload.username }))
        
        navigate("/user_preferences"); 
      }).catch((err) => {
         setLoginErr({
          isErr: true,
          message:"Server error"
        })
      })
    })
    .catch((error) => {
      if (error.response) {
        setLoginErr({
          isErr: true,
          message:error.response.data.error
        })
      } else {
        setLoginErr({
          isErr: true,
          message:"Server error"
        })

      }
    });



  }


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/4 border-2 border-black flex justify-center items-center rounded-2xl  p-6 text-black">
          <div className="flex flex-col w-full gap-4">
            <div className="text-center  text-xl font-bold">
              Login
          </div>
          {loginErr.isErr &&
            <span className='text-red-500 text-center'>{loginErr.message}</span>
          }
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="">Username</label>
              <input type="text" id="username" className="p-2 rounded-3xl border-2 border-black" required />

              <label htmlFor="password" className="">Password</label>
              <input type="password" id="password" className="p-2 rounded-3xl border-2 border-black" required />
            </div>

            <div className="text-center">
              <button className="rounded-xl px-4 py-2 border-black border-2 " id="btn-submit" onClick={HandleLogin} >Sign In</button>
            </div>
          </div>
        </div>
      </div>
  )
}
