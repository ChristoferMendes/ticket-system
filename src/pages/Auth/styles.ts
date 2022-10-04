import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121212;
`;

export const AuthContainer = styled.div`
  background-color: #eaeaec;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    display: flex;
    justify-content: center;
    background-color: #181c2e;
    width: 100%;

    img {
      padding: 20px;
      width: 170px;
      height: 140px;
    }
  }

  
  form {
    margin-top: 1.5em;
    width: 90%;
    display: flex;
    flex-direction: column;
  
    h1 {
      text-align: center;
      padding-bottom: 0.5em;
      color: #181c2e;
    }

    input {
      margin-bottom: 0.7em;
      height: 2em;
      border: 0;
      border-radius: 7px;
      padding: 1em;
      font-size: 1em;
    }

    button {
     height: 2em;
     border: 0;
     border-radius: 7px;
     background-color: #181c2e;
     color: #fff;
     font-size: 1.2em;
    }

  }

  a {
      margin: 1.5em 0;
      color: #000;
  }
`


