import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import logo from '../../../assets/logo.png'
import { AuthContext } from "../../../contexts/auth";
import { Container, AuthContainer } from "../styles";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const { signIn, loadingAuth } = useContext(AuthContext)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      signIn(email, password);
    }
  }

  return (
    <Container>
      <AuthContainer>
        <div>
          <img src={logo} alt="" />
        </div>

        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? 'Loading...' : 'Access'}</button>
        </form>

        <Link to={'/signup'}>Doesn't have an account? Sign up</Link>
      </AuthContainer>
    </Container>
  )
}

export default SignIn