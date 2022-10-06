import styled from 'styled-components';
import type { Status, StatusProps } from '../../pages/DashBoard/styles';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

export const ModalContent = styled.div`
  position: fixed;
  max-width: 600px;
  top: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 4em 2em; 
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);

  button {
    background-color: #f65835;
    border: 0;
    color: #fff;
    position: absolute;
    top: 15px;
    left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 15px;
    border-radius: 5px;

    svg {
      margin-right: 5px;
    }
  }

  h2 {
    margin-bottom: 1.2em;
    font-size: 2em;
  }

  span {
    font-weight: bold;
    font-size: 1.1em;
    color: #121212;

    a {
      font-weight: 400;
      margin-right: 1em;
      padding: 2px 8px;
      border-radius: 5px;
    }
  }

  p {
    white-space: pre-wrap;
  }
`

export const Row = styled.div`
  margin-bottom: 1em;
`

export const StatusModal = styled.a<StatusProps>`
  background-color: red;
  padding: 0px 20px;
  color: #fff;
`