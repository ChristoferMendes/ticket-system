import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { Sidebar } from "./styles";
import avatar from '../../assets/avatar.png'
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'


export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <Sidebar>
      <div>
        <img 
        src={user?.avatarUrl == null ? avatar : user?.avatarUrl} 
        alt={`${user?.name} avatar`} />
      </div>

      <Link to={'/dashboard'}>
        <FiHome color="#fff"/>
        Tickets
      </Link>
      <Link to={'/customers'}>
        <FiUser color="#fff"/>
        Customers
      </Link>
      <Link to={'/profile'}>
        <FiSettings color="#fff"/>
        Settings
      </Link>
    </Sidebar>
  )
}