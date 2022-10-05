import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Status = styled.div`
  display: flex;
  font-size: .8em;
  align-items: center;

  input[type="radio"] {
    margin: 15px 0;
    cursor: pointer;
  }

  input[type="radio"]:not(:first-child) {
    margin-left: 15px;
  }

  span {
    padding-right: 2em;
  }
`

export const TextArea = styled.textarea`
  height: 110px;
  resize: none;
`