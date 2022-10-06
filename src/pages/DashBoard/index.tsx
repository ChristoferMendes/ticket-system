import React, { useContext, useEffect, useState } from 'react'
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { Container } from '../../components/Title/styles';
import { AuthContext } from '../../contexts/auth'
import { Content } from '../Profile/styles';

import firebase from '../../services/firebaseConnect'
import { DashboardContainer, SearchMoreButton, Status, Table, TicketLink } from './styles'
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Modal from '../../components/Modal';

export interface Ticket {
  id: string;
  customer: string;
  customerId: number;
  subject: string;
  status: 'Open' | 'Progress' | 'Finished';
  created: Date;
  formatedDate: string;
  complement: string;
}

interface Doc {
  data: () => any;
  id: string;
}

const listRef = firebase.firestore().collection('tickets')
  .orderBy('status', 'desc');

function Dashboard() {
  const { signOut } = useContext(AuthContext);
  const [tickets, setTickets] = useState<Ticket[] | []>([])
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState<Ticket>();

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState<Ticket>()

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const getTickets = await listRef.limit(5).get();
        console.log('TICKETS: ', getTickets);
        updateState(getTickets)
  
  
      } catch (e) {
        console.log(e);
        toast.error('Something went wrong :(')
  
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, [])

  

  const updateState = async (tickets: any) => {
    const isCollectionEmpty = tickets.size === 0;

    if (!isCollectionEmpty) {
      const list: Ticket[] = [];

      tickets.forEach((doc: Doc) => {
        list.push({
          id: doc.id,
          subject: doc.data().subject,
          customer: doc.data().customer,
          customerId: doc.data().customerId,
          created: doc.data().created,
          formatedDate: format(doc.data().created.toDate(), 'MM/dd/yyy'),
          status: doc.data().status,
          complement: doc.data().complement,
        })
      })

      const lastDoc: Ticket = tickets.docs[tickets.docs.length - 1]; //Catching last document

      setTickets(prev => [...prev, ...list])
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }

    setLoading(false);
  }

  const handleMore = async () => {
    setLoadingMore(true);
    try {
      const getMore = await listRef.startAfter(lastDocs).limit(5)
        .get()

      updateState(getMore);

    } catch (e) {
      toast.error('Error while fetching more...')
    } finally {
      setLoadingMore(false);
    }

  }

  const togglePostModal = (item: Ticket) => {
    setShowPostModal(!showPostModal);
    setDetail(item)
  }

  if (loading) {
    return (
      <div>
        <Header />
        <Content>
          <Title name='Dashboard'>
            <FiMessageSquare size={25} />
          </Title>

          <DashboardContainer>
            <span>Fetching tickets...</span>
          </DashboardContainer>
        </Content>
      </div>
    )
  }

  return (
    <>
      <Header />
      <Content>
        <Title name='Dashboard'>
          <FiMessageSquare size={25} />
        </Title>
        {tickets.length == 0 ? (
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
                  <th scope='col'>Customer</th>
                  <th scope='col'>Subject</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Created At</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td data-label='Customer'>{item.customer}</td>
                      <td data-label='Subject'>{item.subject}</td>
                      <td data-label='Status'>
                        <Status status={`${item.status}`}>{item.status}</Status>
                      </td>
                      <td data-label='Created At'>{item.formatedDate}</td>
                      <td data-label='#'>
                        <button
                          style={{ backgroundColor: '#3583f6' }}
                          onClick={() => togglePostModal(item)}
                        >
                          <FiSearch size={17} />
                        </button>
                        <button style={{ backgroundColor: '#f6a935' }} >
                          <FiEdit2 size={17} />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
            {loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Searching more tickets...</h3>}
            {!loadingMore && !isEmpty ? (
              <SearchMoreButton onClick={() => handleMore()}>Search more</SearchMoreButton>
            ) : (
              <h3 style={{ textAlign: 'center', margin: 20 }}>There's no more tickets</h3>
            )
            }
          </>
        )}

        {showPostModal && detail && (
          <Modal content={detail} togglePostModal={togglePostModal} />
        )}
      </Content>
    </>
  )
}

export default Dashboard