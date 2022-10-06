import { FiArrowLeft } from 'react-icons/fi'
import type { Ticket } from '../../pages/DashBoard';
import { Status } from '../../pages/DashBoard/styles';

import { Container, ModalContent, Row, StatusModal } from "./style";

interface ModalProps {
  content: Ticket,
  togglePostModal: (item: Ticket) => void;
  
}

export default function Modal({ content, togglePostModal }: ModalProps) {
  return( 
    <Container>
      <ModalContent>
        <button onClick={() => togglePostModal(content) }>
          <FiArrowLeft size={23} color='#fff'/> Go back
        </button>

        <div>
          <h2>Details of the ticket</h2>
          <Row>
            <span>
              Customer: <a>{content.customer}</a>
            </span>
          </Row>
          <Row>
            <span>
              Subject: <a>{content.subject}</a>
            </span>
            <span>
              Registered in: <a>{content.formatedDate}</a>
            </span>
          </Row>
          <Row>
            <span>
              Status: <StatusModal status={content.status}>{content.status}</StatusModal>
            </span>
          </Row>
          {content.complement !== '' && (
            <>
              <h3>Complement</h3>
              <p>{content.complement}</p>
            </>
          )}
        </div>
      </ModalContent>
    </Container>
  )
}