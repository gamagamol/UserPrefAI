
export default function FormComponent(){
    return (
        <div className="w-1/4 border-2 border-gray-300 flex justify-center items-center rounded-2xl bg-blue-500 p-6">
            <div className="flex flex-col w-full gap-4">
                <div className="text-center text-white text-xl font-bold">
                User Prefrences
                </div>

                <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-white">Username</label>
                <input type="text" id="username" className="p-2 rounded-3xl border-2 border-white" />

                <label htmlFor="password" className="text-white">Password</label>
                <input type="password" id="password" className="p-2 rounded-3xl border-2 border-white" />
                </div>

                <div className="text-center">
                <button className="rounded-xl bg-blue-900 text-white px-4 py-2" id="btn-submit">Sign In</button>
                </div>
            </div>
        </div>
  )
}