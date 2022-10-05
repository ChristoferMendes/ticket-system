import { FiUser } from 'react-icons/fi'

import firebase from '../../services/firebaseConnect'
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Container, Form, FormContainer } from "./styles";
import { FormEvent, useState } from 'react';
import { Content } from '../Profile/styles';
import { toast } from 'react-toastify';

export default function Customers() {
  const [fantasyName, setFantasyName] = useState('')
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('')

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();

    if (fantasyName !== '' && cnpj !== '' && address !== '') {
      await firebase.firestore().collection('customers')
      .add({
        fantasyName,
        cnpj,
        address,
      })
      .then(() => {
        setFantasyName('');
        setCnpj('');
        setAddress('');
        toast.info('Customer added with success.')
      })
      .catch((e) => {
        console.log(e);
        toast.error('Error while registering this customer.')
      })
    } else {
      toast.error('All the fields are mandatory!')
    }
  }

  return (
    <>
      <Header />
      <Content>
        <Title name="Customers">
          <FiUser size={25} />
        </Title>
      </Content>

      <FormContainer>
        <Form onSubmit={handleAdd}>
          <label htmlFor="">Fantasy name</label>
          <input type="text" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} placeholder="Yours fantasy name"/>
          
          <label htmlFor="">CNPJ</label>
          <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Yours CNPJ"/>
          
          <label htmlFor="">Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Yours address"/>
          
          <button type='submit'>Register</button>
       
       </Form>
      </FormContainer>
    </>
  )
}