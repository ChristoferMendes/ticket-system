import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const FormContainer = styled.div`
  background-color: #f8f8f8;
  
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin-left: 250px;
  padding-top: 20px;

  width: 25%;

  button {
    height: 2.4em;
    border: 0;
    border-radius: 7px;
    background-color: #181c2e;
    color: #fff;
    margin: 1.5em 0;
    max-width: 600px;
  }

  input {
    border-radius: 7px;
    border: 0;
    height: 2.4em;
    max-width: 600px;
  }

  * {
    padding: 5px;
  }

  * + label {
    margin-top: 20px;
  }
`