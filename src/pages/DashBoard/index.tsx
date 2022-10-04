import React, { useContext } from 'react'
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth'

function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <div>Dashboard</div>
      <button onClick={() => signOut()}>Leave account</button>
    </div>
  )
}

export default Dashboard