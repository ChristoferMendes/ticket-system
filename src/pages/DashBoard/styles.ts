import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface StatusProps {
  status: 'Open' | 'Progress' | 'Finished'
}

export const Container = styled.div`
  
`;

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    margin: 2em 0;
    font-weight: 600;
    font-size: 1.4em;
  }

`

export const Table = styled.table`
  /* background-color: red; */
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  caption {
    font-size: 1.5em;
    margin: .5em 0 .75em;
  }

  tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .35em;
  }
  
  th, td {
    padding: .62em;
    text-align: center;
  }

  th {
    font-size: .85em;
    letter-spacing: .2em;
    text-transform: uppercase;
  }

  td button {
    border: 0;
    padding: 5px;
    margin-right: 2px;
    align-items: center;
    display: inline-block;
    border-radius: 4px;

    svg {
      vertical-align: middle;
    }
  }

  td span {
    padding: 3px 20px;
    border-radius: 3px;
    color: #fff;
  }

  @media screen and (max-width: 600px){
    border: 0;

    caption {
      font-size: 1.3em;
    }

    thead {
      border: none;
      clip: rect(0, 0, 0, 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: .65em;
    }

    td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: .8em;
      text-align: right;

      &:before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  
`

export const TicketLink = styled(Link)`
    
    float: right;
    margin-bottom: 1.5em;
    background-color: #83bf02;
    color: white;
    border: 0;
    padding: .5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.4em;
    border-radius: 6px;
    transition: ease-in .2s;

    svg {
      margin-right: 5px;
    }

    &:hover {
      background-color: #5fd204;
      transform: scale(1.1)
    }

`

export const Status = styled.span<StatusProps>`
  background-color: ${props => props.status == 'Finished' 
  ? '#BEBEBE' 
  : props.status == 'Progress' ? 
  '#c4af1b' : 
  '#1fd655' };
`

export const SearchMoreButton = styled.button`
    margin: 1.5em 0;
    padding: .5em 1em;
    height: 35px;
    border: 0;
    border-radius: 7px;
    background-color: #181c2e;
    color: #fff;
`