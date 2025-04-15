
  import axios from 'axios';

export default function LoginPage() {

  const HandleLogin = () => {
    
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const apiUrl = process.env.VITE_URL_BACKEND;

    axios.post(`${apiUrl}/login`, {
      username: username,
      password:password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log(response);
        console.log('Login Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });


  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/4 border-2 border-black flex justify-center items-center rounded-2xl  p-6 text-black">
          <div className="flex flex-col w-full gap-4">
            <div className="text-center  text-xl font-bold">
              Login
            </div>

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
