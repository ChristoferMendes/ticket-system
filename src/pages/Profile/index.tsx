import { FormEvent, useContext, useState } from 'react';
import { FiSettings, FiUpload } from 'react-icons/fi'

import firebase from '../../services/firebaseConnect'
import Header from '../../components/Header';
import Title from "../../components/Title";
import { AuthContext } from '../../contexts/auth';
import { Container, Content, Form, LogoutContainer, UserContainer } from "./styles";
import avatar from '../../assets/avatar.png'
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext)

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  const handleFile = (e: FormEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const image = input.files[0];
    
    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image))
    } else {
      toast.warn('Image needs to be in jpeg or png format')
      setImageAvatar(null);
      return null;
    }
  }

  const handleUpload = async () => {
    const currentUid = user?.uid;

    if (!imageAvatar) {
      return;
    }

    const uploadTask = await firebase.storage()
    .ref(`images/${currentUid}/${imageAvatar?.name}`)
    .put(imageAvatar)
    .then(() => {
      console.log('Photo send')
    })
    .catch((e) => {
      console.log(e.message);
      toast.error('Error while sending the image')
    })
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
              <p>{imageAvatar ? 'Preview...' : ''}</p> 
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