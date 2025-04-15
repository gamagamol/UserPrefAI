import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavComponent from '../components/NavComponent';
import { updatePreferences } from '../features/PreferencesSlice';
    
export default function UserPreferencesPage() {


    const preferences = useSelector((state) => state.preferences)
    const [isDarkTheme, setIsDarkTheme] = useState(preferences.isDarkTheme);
    const [isEnabledNotification, setisEnabledNotification] = useState(preferences.isEnabledNotification);
    const dispatch = useDispatch();
    const [isErr, setErr] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [commandPromptError,setCommandPromptError]=useState(false)
    const apiUrl = process.env.VITE_URL_BACKEND;
    

    const handleToggleTheme = async () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        dispatch(updatePreferences({ isDarkTheme: newTheme }))

        axios.post(`${apiUrl}/preferences`, {
            isDarkTheme: newTheme,
            isEnabledNotification: preferences.isEnabledNotification,
            language:preferences.language
            }, {
            headers: {
                "Content-Type": "application/json"
            },
        withCredentials: true
        }).catch((err) => {
            
            setErr(true)
            setErrMessage("Error While Update Theme")
            console.log("masuk sini");
            console.log(preferences.isDarkTheme);
            setIsDarkTheme(preferences.isDarkTheme);
            dispatch(updatePreferences({ isDarkTheme: preferences.isDarkTheme }))

        })

    };

    const handleToggleNotification =() => {
        const newNotif = !isEnabledNotification
        setisEnabledNotification(newNotif);
        dispatch(updatePreferences({ isEnabledNotification: newNotif }))

         axios.post(`${apiUrl}/preferences`, {
            isDarkTheme: preferences.isDarkTheme,
            isEnabledNotification: newNotif,
            language:preferences.language
            }, {
            headers: {
                "Content-Type": "application/json"
            },
        withCredentials: true
        }).catch((err) => {
            setErr(true)
            setErrMessage("Error While Update Notification")
            setisEnabledNotification(preferences.isEnabledNotification);
            dispatch(updatePreferences({ isEnabledNotification: preferences.isEnabledNotification }))

        })

    };

    const handleLanguageChange = async (e) => {
        const oldLanguange = preferences.language
        dispatch(updatePreferences({ language: e.target.value }));

         axios.post(`${apiUrl}/preferences`, {
            isDarkTheme: preferences.isDarkTheme,
            isEnabledNotification: preferences.isEnabledNotification,
            language:e.target.value
            }, {
            headers: {
                "Content-Type": "application/json"
            },
        withCredentials: true
        }).catch((err) => {
            setErr(true)
            setErrMessage("Error While Update Languange")
            dispatch(updatePreferences({ language: oldLanguange }))

        })
    };

    const handleChatAI = (e) => {
        if (e.key === "Enter") {
            let prompt = e.target.value

            let newPreferences = {
                isDarkTheme:preferences.isDarkTheme,
                isEnabledNotification:preferences.isEnabledNotification,
                language:preferences.language
            }
            setCommandPromptError(false);
            
            if (prompt.toLowerCase().includes("dark mode") ||  prompt.toLowerCase().includes("mode gelap") ||  prompt.includes("ダークモード")) {
                newPreferences.isDarkTheme = true;
            } else if (prompt.toLowerCase().includes("light mode") || prompt.toLowerCase().includes("mode terang") || prompt.includes("ライトモード") ) {
                newPreferences.isDarkTheme = false;
                
            }  else if (prompt.toLowerCase().includes("change languange to indonesia") || prompt.toLowerCase().includes("ubah bahasa menjadi bahasa indonesia ") || prompt.includes("インドネシア語に変更")) {
                newPreferences.language = "indonesia";
                
            } else if (prompt.toLowerCase().includes("change languange to english")|| prompt.toLowerCase().includes("ubah bahasa menjadi bahasa inggris ") || prompt.includes("英語に変更")) {
                newPreferences.language = "english";
                
            } else if (prompt.toLowerCase().includes("change languange to japan")  || prompt.toLowerCase().includes("ubah bahasa menjadi bahas jepang ") || prompt.includes("日本語に変更")) {
                newPreferences.language = "japan";
                
            } else if (prompt.toLowerCase().includes("notification  on") || prompt.toLowerCase().includes("nyalakan pemberitahuan") ||  prompt.includes("通知をオンにする")) {
                newPreferences.isEnabledNotification = true;
                
            } else if (prompt.toLowerCase().includes("notification  off") || prompt.toLowerCase().includes("matikan pemberitahuan") || prompt.includes("通知をオフにする") ) {
                newPreferences.isEnabledNotification = false;

            } else {
                setCommandPromptError(true)
            }


            if (!commandPromptError) {
                setIsDarkTheme(newPreferences.isDarkTheme)
                setisEnabledNotification(newPreferences.isEnabledNotification)
                dispatch(updatePreferences(newPreferences));

                axios.post(`${apiUrl}/preferences`, newPreferences, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                withCredentials: true
                }).catch((err) => {
                    setErr(true)
                    setErrMessage("Error While Update Prefences From Prompt")
                    setIsDarkTheme(preferences.isDarkTheme)
                    setisEnabledNotification(preferences.isEnabledNotification)
                    dispatch(updatePreferences(preferences))

                })


            }

        }
    }

    useEffect(() => {
        if (isDarkTheme) {
      document.documentElement.classList.add('dark');
        } else {
      document.documentElement.classList.remove('dark');
    } }, [isDarkTheme]);


    
    return (
            <div className="w-full h-screen flex flex-col  justify-center items-center  dark:bg-dark  dark:bg-black">
            <NavComponent  />
            
                <div className="w-1/4  border-2 border-gray-300 flex  justify-center items-center rounded-2xl   p-6 dark:bg-black dark:border-white dark:text-white ">
                    <div className="flex flex-col w-full gap-4">
                        <div className="text-center  text-xl font-bold">
                            {preferences.lang.preferencesTitle}
                        </div>

                        {isErr && <span className='text-red-700 text-3xl font-bold' id="errMessage" > {errMessage} </span>
                        }
                        
                        <div className="flex flex-col gap-2">

                            <label htmlFor="languanges" >
                                {preferences.lang.languanges}
                            </label>
                            <select
                                    name="languages"
                                    id="languages"
                                  value={preferences.language}
                                    onChange={handleLanguageChange}
                                    className="p-2 rounded-3xl border-2 border-gray-300"
                                >
                                {preferences.languangeList.map((lang) => (
                                    <option key={lang} value={lang}  >
                                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                    </option>
                                    ))}
                            </select>

                            <label >
                                {preferences.lang.theme}

                            </label>
                            <div className="relative inline-block w-11 h-5">
                                <input
                                        id="switch-component-1"
                                        type="checkbox"
                                        className="peer appearance-none w-11 h-5 bg-red-500 rounded-full checked:bg-green-500 cursor-pointer transition-colors duration-300"
                                        checked={isDarkTheme}
                                        onChange={handleToggleTheme}
                                    />
                                <label
                                        htmlFor="switch-component-1"
                                        className="absolute top-0 left-0 w-5 h-5 bg-slate-100 rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-green-800 cursor-pointer"
                                ></label>
                            </div>

                            <label >
                                {preferences.lang.notification}


                            </label>
                            <div className="relative inline-block w-11 h-5">
                                <input
                                        id="switch-component-2"
                                        type="checkbox"
                                        className="peer appearance-none w-11 h-5 bg-red-500 rounded-full checked:bg-green-500 cursor-pointer transition-colors duration-300"
                                        checked={isEnabledNotification}
                                        onChange={handleToggleNotification}
                                    />
                                <label
                                        htmlFor="switch-component-2"
                                        className="absolute top-0 left-0 w-5 h-5 bg-slate-100 rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-green-800 cursor-pointer"
                                ></label>
                            </div>
                        </div>
                    </div>
            </div>
            
{commandPromptError && <span className='text-red-700 text-3xl font-bold' id="commandPromptErr" > Command Prompt Not Found </span>
                        }
             <textarea name="prompt" id="prompt" className='w-1/2 border-2 border-gray-300 flex  justify-center items-center rounded-2xl   p-6 dark:bg-black dark:border-white dark:text-white mt-20' placeholder='Change Prefences With Chat'  onKeyDown={handleChatAI}></textarea>
            
            </div>
    )
}