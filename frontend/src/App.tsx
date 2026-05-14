import {Routes,Route,Navigate} from 'react-router-dom'
// import Login from './pages/Login';
// import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';


import MainLayout from './components/layout/MainLayout'


export default function App()
{
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> */}
      <Route element={<MainLayout />}>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
     </Route>
    </Routes>
  )
}