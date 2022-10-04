import { useContext, useState } from 'react';
import { FiSettings, FiUpload } from 'react-icons/fi'
import Header from '../../components/Header';

import Title from "../../components/Title";
import { AuthContext } from '../../contexts/auth';
import { Container, Content, Form, LogoutContainer, UserContainer } from "./styles";
import avatar from '../../assets/avatar.png'
import { AuthContainer } from '../Auth/styles';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext)

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl)

  return (
    <Container>
      <Header />
      <Content>
        <Title name={'My profile'}>
          <FiSettings size={25} color={'#333'} />
        </Title>

        <UserContainer>
          <Form>
            <label className='label-avatar'>
              <span>
                <FiUpload color='#fff' size={25} />
              </span>

              <input type="file" accept='image/*' className={'file-input'} /> <br /> <br />
              {<img src={avatarUrl == null ? avatar : avatarUrl} width={'250'} height={'250'} />}
            </label>

            {name && email && (
              <>
                <label>Name</label>
                <input
                  className='name-input'
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} />

                <label>Email</label>
                <input type="text" value={email} disabled={true} />

                <button type='submit'>Save</button>
              </>
            )
            }
          </Form>
        </UserContainer>

        <LogoutContainer>
            <button onClick={() => signOut()}>Logout</button>
        </LogoutContainer>
      </Content>
    </Container>
  )
}