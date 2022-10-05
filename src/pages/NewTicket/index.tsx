import { FormEvent } from 'react';
import { FiPlus } from 'react-icons/fi'

import Header from "../../components/Header";
import Title from "../../components/Title";
import { Container } from '../../components/Title/styles';
import { Content, Form } from '../Profile/styles';
import { Status, TextArea } from './styles'

export default function NewTicket() {

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
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
            <select>
              <option key={1} value={1}>A</option>
            </select>

            <label>Subject</label>
            <select>
              <option value={"Support"}>Support</option>
              <option value={"Tech visit"}>Tech visit</option>
              <option value={"Financial"}>Financial</option>
            </select>

            <label>Status</label>
            <Status>
              <input type="radio" name="radio" value={"Open"} />
              <span>Open</span>
              <input type="radio" name="radio" value={"Progresss"} />
              <span>Progresss</span>
              <input type="radio" name="radio" value={"Finished"} />
              <span>Finished</span>
            </Status>

            <label>Complement</label>
            <TextArea typeof="text" placeholder='Describe your problem (optional)'/>

            <button type='submit'>Submit</button>
          </Form>
        </Container>
      </Content>
    </>
  )
}