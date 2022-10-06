import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/DashBoard";
import SignIn from "../pages/Auth/SignIn";
import Signup from "../pages/Auth/SignUp";
import RouteWrapper from "./Router";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";
import NewTicket from "../pages/NewTicket";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<RouteWrapper loggedComponent={<Dashboard />} />} />

      <Route path='/signin' element={<RouteWrapper loggedComponent={<Dashboard />} />} />

      <Route path='/signup' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<Signup />} />} />
        
      <Route path='/dashboard' element={<RouteWrapper loggedComponent={<Dashboard />} isPrivate />}/>
      
      <Route path="/profile" element={<RouteWrapper loggedComponent={<Profile />} isPrivate />}/>

      <Route path="/customers" element={<RouteWrapper loggedComponent={<Customers />} isPrivate/>} />
  
      <Route path="/new_ticket" element={<RouteWrapper loggedComponent={<NewTicket />} isPrivate/>} />

      <Route path="/new_ticket/:id" element={<RouteWrapper loggedComponent={<NewTicket /> } isPrivate/> } />
  </Routes>
  )
}