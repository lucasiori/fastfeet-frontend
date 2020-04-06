import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  label {
    font-weight: bold;
    color: #444;
  }

  input {
    height: 45px;
    color: #999;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px 10px;

    &::placeholder {
      color: #999;
    }
  }

  input:-webkit-autofill, input:-webkit-autofill:hover,
  input:-webkit-autofill:focus  {
    -webkit-text-fill-color: #999;
    box-shadow: 0 0 0 30px white inset !important;
  }

  input:not([type="submit"]):focus, textarea:focus {
    border-color: #7d40e7;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  /** Customize Scrollbar */
  #root *::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  #root *::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: inset 0 0 8px 0 #ccc;
    border-radius: 30px;
  }

  #root *::-webkit-scrollbar-thumb {
    background: #7d40e7;
    border-radius: 30px;
  }

  /** Custom React Confirm Alert */
  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.7);
  }

  .react-confirm-alert {
    width: 90%;
    max-width: 450px;
  }
`;
