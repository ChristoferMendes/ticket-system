import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/DashBoard";
import SignIn from "../pages/Auth/SignIn";
import Signup from "../pages/Auth/SignUp";
import RouteWrapper from "./Router";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />}/>} />

      <Route path='/dashboard' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />} isPrivate />}/>

      <Route path='/signin' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />} />} />

      <Route path='/signup' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<Signup />} />} />
  </Routes>
  )
}