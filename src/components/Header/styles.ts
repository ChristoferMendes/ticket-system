import styled from 'styled-components';

import cover from '../../assets/cover.png'
import { Content } from '../../pages/Profile/styles';

export const Sidebar = styled.div`

  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #181c2e;
  position: fixed;
  height: 100%;
  overflow: auto;

  div {
    background-image: url(${cover});
    background-color: #181c2e;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 150px;
    padding-top: 30px;

    img {
      border-radius: 50%;
      display: block;
      margin: auto;
      width: 90px;
      height: 90px;
      -webkit-filter: drop-shadow(2px 3px 6px #121212);
      filter: drop-shadow(2px 3px 6px #121212);
      object-fit: cover;
    }
    
  }

  a {
    display: block;
    color: rgba(255, 255, 255, 0.7);
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: ease-in-out .4s;

    &:hover {
      background-color: #121212;
      color: #fff;
    }

    svg {
      margin-right: .5em;
    }
  }

  /* Content {
    background-color: red !important;
  } */

  @media screen and (max-width: 700px) {
    width: 100%;
    height: auto;
    position: relative;

    

    a {
      float: left;
    }

    div {
      display: none;
    }
  }

  @media screen and (max-width: 400px) {
    a {
      text-align: center;
      float: left;
      
      svg {
        display: none;
      }
    }
  }
`;
