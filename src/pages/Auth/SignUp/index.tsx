import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";


import logo from '../../../assets/logo.png'
import { AuthContext } from "../../../contexts/auth";
import { Container, AuthContainer } from "../styles"

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password,  setPassword] = useState('')

  const { signUp, loadingAuth } = useContext(AuthContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (name !== '' && email !== '' && password !== '') {
      signUp(name, email, password)
    }
  }

  return (
    <Container>
      <AuthContainer>
        <div>
          <img src={logo} alt="" />
        </div>

        <form action="" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input 
          type="text" 
          placeholder="John Doe" 
          value={name} 
          onChange={(e) => setName(e.target.value)}/>
          <input 
          type="text" 
          placeholder="email@email.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}/>
          <input 
          type="password" 
          placeholder="*******" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">{loadingAuth ? 'Loading...' : 'Register'}</button>
        </form>

        <Link to={'/signin'}>Already have an account? SignIn</Link>
      </AuthContainer>
    </Container>
  )
}

export default SignUp