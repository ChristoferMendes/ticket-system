import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi'

import firebase from '../../services/firebaseConnect';
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Container } from '../../components/Title/styles';
import { AuthContext } from '../../contexts/auth';
import { Content, Form } from '../Profile/styles';
import { Status, TextArea } from './styles'
import { toast } from 'react-toastify';

interface User {
  id: string;
  fantasyName: string;
}

export default function NewTicket() {
  const [subject, setSubject] = useState('Support');
  const [status, setStatus] = useState('Open')
  const [complement, setComplement] = useState('')

  const [customers, setCustomers] = useState<User[] | []>([])
  const [loading, setLoading] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const { user } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      try {
        const getCustomers = await firebase.firestore().collection('customers').get();

        const list: User[] = [];
        getCustomers.forEach((doc) => {
          list.push({
            id: doc.id,
            fantasyName: doc.data().fantasyName,
          })
        })

        if (!list.length) {
          setCustomers([{ id: '1', fantasyName: '' }])
          setLoading(false);
          return;
        }

        setCustomers(list);


      } catch (error) {
        console.log(error);
        setCustomers([{ id: '1', fantasyName: '' }])
      } finally {
        setLoading(false);
      }
    })()
  }, [])


  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await firebase.firestore().collection('tickets')
      .add({
        created: new Date(),
        customer: customers[customerSelected].fantasyName,
        customerId: customers[customerSelected].id,
        subject,
        status,
        complement,
        userUid: user?.uid,
      })

      toast.success('Ticket created with success!')

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong :(')
    } finally {
      setComplement('')
      setCustomerSelected(0)
    }

  }

  const handleChangeSelect = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setSubject(target.value);
  }

  const handleOptionChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setStatus(target.value);
  }

  const handleChangeCustomer = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setCustomerSelected(Number(target.value));
  }

  return (
    <>
      <Header />
      <Content>
        <Title name="New Ticket">
          <FiPlus size={25} />
        </Title>

        <Container>
          <Form action="" onSubmit={handleRegister}>
            <label>Customer</label>
            {loading ? (
              <input type={'text'} disabled={true} value={'Loading customers...'}></input>
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomer}>
                {customers.map((item, index) => (
                  <option key={item.id} value={index}>{item.fantasyName}</option>
                ))}
              </select>
            )}
            <label>Subject</label>
            <select value={subject} onChange={handleChangeSelect}>
              <option value={"Support"}>Support</option>
              <option value={"Tech visit"}>Tech visit</option>
              <option value={"Financial"}>Financial</option>
            </select>

            <label>Status</label>
            <Status>
              <input
                type="radio"
                name="radio"
                value={"Open"}
                onChange={handleOptionChange}
                checked={status === 'Open'} />
              <span>Open</span>
              <input
                type="radio"
                name="radio"
                value={"Progress"}
                onChange={handleOptionChange}
                checked={status === 'Progress'} />
              <span>Progresss</span>
              <input
                type="radio"
                name="radio"
                value={"Finished"}
                onChange={handleOptionChange}
                checked={status === 'Finished'} />
              <span>Finished</span>
            </Status>

            <label>Complement</label>
            <TextArea
              typeof="text"
              placeholder='Describe your problem (optional)'
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />

            <button type='submit'>Submit</button>
          </Form>
        </Container>
      </Content>
    </>
  )
}