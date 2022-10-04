import { useContext, useState } from 'react'
import GlobalStyle from './styles/global'
import firebase from './services/firebaseConnect'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './routes'
import AuthProvider, { AuthContext } from './contexts/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'

function App() {
  const { user, auth } = useContext(AuthContext)

  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
      <AuthProvider>
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
