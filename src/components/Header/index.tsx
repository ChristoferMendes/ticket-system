import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { Sidebar } from "./styles";
import avatar from '../../assets/avatar.png'
import { Link } from "react-router-dom";


export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <Sidebar>
      <div>
        <img 
        src={user?.avatarUrl === null ? avatar : user?.avatarUrl} 
        alt={`${user?.name} avatar`} />
      </div>

      <Link to={'/'}>Tickets</Link>
    </Sidebar>
  )
}