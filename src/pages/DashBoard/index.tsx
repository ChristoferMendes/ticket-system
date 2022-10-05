import React, { useContext, useState } from 'react'
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { Container } from '../../components/Title/styles';
import { AuthContext } from '../../contexts/auth'
import { Content } from '../Profile/styles';

import { DashboardContainer, Table, TicketLink } from './styles'

function Dashboard() {
  const { signOut } = useContext(AuthContext);
  const [tickets, setTickets] = useState([1])

  return (
    <>
      <Header />
      <Content>
        <Title name='Dashboard'>
          <FiMessageSquare size={25} />
        </Title>
        {!tickets.length ? (
          <Container className='dashboard'>
            <DashboardContainer>
              <span>There's none tickets</span>
              <TicketLink to={'/new_ticket'} className='new-ticket'>
                <FiPlus size={25} />
                New ticket
              </TicketLink>
            </DashboardContainer>
          </Container>
        ) : (
          <>
            <TicketLink to={'/new_ticket'}>
              <FiPlus size={25} />
              New ticket
            </TicketLink>

            <Table>
              <thead>
                <tr>
                  <th scope='col'>Client</th>
                  <th scope='col'>Subject</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Registered in</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label='Client'>Chris</td>
                  <td data-label='Subject'>Support</td>
                  <td data-label='Status'>
                    <span style={{backgroundColor: '#5cb85c'}}>Open</span>
                  </td>
                  <td data-label='Registered'>20/08/2022</td>
                  <td data-label='#'>
                    <button style={{backgroundColor: '#3583f6'}}>
                      <FiSearch size={17}/>
                    </button>
                    <button style={{backgroundColor: '#f6a935'}} >
                      <FiEdit2 size={17} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Content>
    </>
  )
}

export default Dashboard