import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavComponent from '../components/NavComponent';
import { updatePreferences } from '../features/PreferencesSlice';
    
    
export default function UserPreferencesPage() {
    const preferences = useSelector((state)=>state.preferences)
    const [isDarkTheme, setIsDarkTheme] = useState(preferences.isDarkTheme);
    const [isEnabledNotification, setisEnabledNotification] = useState(preferences.isEnabledNotification);
    const dispatch = useDispatch();

    const handleToggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        dispatch(updatePreferences({ isDarkTheme: newTheme }))

    };
    const handleToggleNotification = () => {
        const newNotif = !isEnabledNotification
        setisEnabledNotification(newNotif);
        dispatch(updatePreferences({ isEnabledNotification: newNotif }))
        

    };

    const handleLanguageChange = (e) => {
        dispatch(updatePreferences({ language: e.target.value }));
    };



    useEffect(() => {
        if (isDarkTheme) {
      document.documentElement.classList.add('dark');
        } else {
      document.documentElement.classList.remove('dark');
    } }, [isDarkTheme]);


    
    return (
        <div className='dark:bg-black'>
            <div className="w-full h-screen flex justify-center items-center mt-10 dark:bg-dark">
            <NavComponent />
                <div className="w-1/4 border-2 border-gray-300 flex justify-center items-center rounded-2xl   p-6 dark:bg-black dark:border-white dark:text-white">
                    <div className="flex flex-col w-full gap-4">
                        <div className="text-center  text-xl font-bold">
                            User Preferences
                        </div>

                        <div className="flex flex-col gap-2">

                            <label htmlFor="languanges" className="">Languanges</label>
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

                            <label >Dark Theme</label>
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

                            <label >Notification</label>
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
            </div>
        </div>
    )
}