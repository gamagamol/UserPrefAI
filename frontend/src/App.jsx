import { Route, Routes } from 'react-router-dom'
import './index.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserPreferencesPage from './pages/UserPreferencesPage'


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user_preferences" element={<UserPreferencesPage />} />
    </Routes>


    </>
      
  )
}

export default App
