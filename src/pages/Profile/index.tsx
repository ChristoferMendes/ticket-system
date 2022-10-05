import { FormEvent, useContext, useState } from 'react';
import { FiSettings, FiUpload } from 'react-icons/fi'

import firebase from '../../services/firebaseConnect'
import Header from '../../components/Header';
import Title from "../../components/Title";
import { AuthContext } from '../../contexts/auth';
import { Container, Content, Form, LogoutContainer, UserContainer } from "./styles";
import avatar from '../../assets/avatar.png'
import { AuthContainer } from '../Auth/styles';

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext)

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState(null);

  const handleFile = (e: FormEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    console.log(file);
  }

  const handleUpload = () => {

  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (imageAvatar === null && name !== '') {
      await firebase.firestore().collection('users')
        .doc(user?.uid)
        .update({
          name,
        }).then(() => {
            const data = {
              ...user,
              name
            };
            setUser(data);
            storageUser(data);
          }
        )
    } else if (name !== '' && imageAvatar !== null) {
      handleUpload();
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Title name={'My profile'}>
          <FiSettings size={25} color={'#333'} />
        </Title>

        <UserContainer>
          <Form onSubmit={handleSave}>
            <label className='label-avatar'>
              <span>
                <FiUpload color='#fff' size={25} />
              </span>

              <input type="file" accept='image/*' className={'file-input'} onChange={handleFile}/> <br /> <br />
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
                <input type="text" value={email ?? 'email'} disabled={true} />

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