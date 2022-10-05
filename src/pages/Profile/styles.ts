import styled, { keyframes } from 'styled-components';

const animatePreview = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.3)
  }
`
export const Container = styled.div`
  
`;

export const Content = styled.div`
  margin-left: 200px;
  padding: 1px 16px;

  @media screen and (max-width: 700px) {
    margin-left: 0;
  }
`

export const UserContainer = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: #f8f8f8;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2em;

  .label-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    span {
      z-index: 99;
      position: absolute;
      opacity: 0.7;
      transition: all .5s;

      &:hover {
        opacity: 1;
        transform: scale(1.4)
      }
    }

    p {
      position: absolute;
      color: #fff;
      margin-top: 10%;
      animation: ${animatePreview} 2s infinite;
    }
  }

  input, button{
    width: 300px;
  }

  .name-input {
    margin-bottom: 2em;
  }

  button {
    height: 2em;
    border: 0;
    border-radius: 7px;
    background-color: #181c2e;
    color: #fff;
    margin-top: 1em;
    max-width: 600px;
  }

  img {
    margin-bottom: 1em;
    border-radius: 50%;
    object-fit: cover;

  }

  input, textarea, select {
    margin-bottom: 1em;
    padding: .7em;
    border: 0;
    border-radius: 5px;
    max-width: 600px;
  }

  input:disabled {
    cursor: not-allowed;
  }

  @media screen and (max-width: 400px) {
    input, button {
      width: 100px;
   }
  }
`

export const LogoutContainer = styled(UserContainer)`
  margin-top: 1em;
  padding: 20px;
  button {
    padding: 8px 20px;
    background-color: transparent;
    border: 1px solid #121212;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`