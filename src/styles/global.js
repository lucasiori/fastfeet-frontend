import { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished';

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
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #7d40e7;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    transition: background 200ms;
    cursor: pointer;

    &[disabled] {
      background: #ccc;
      cursor: not-allowed;
    }

    &:not([disabled]):hover {
      background: ${lighten(0.05, '#7d40e7')};
    }
  }

  table {
    width: 100%;
    font-size: 16px;
    border-spacing: 0 20px;
    text-align: left;

    th {
      color: #444;
      padding: 0 15px;
    }

    tbody > tr {
      height: 57px;
      background: #fff;

      &:last-child:not(:nth-child(1)) {
        .table-actions-menu {
          margin: 0 0 10px;
          bottom: 100%;

          &::before {
            top: auto;
            bottom: -10px;
            transform: rotate(180deg);
          }
        }
      }
    }

    td {
      color: #666;
      padding: 10px 15px;
      border-radius: 4px;
    }

    th#actionsColumn {
      width: 100px;
    }
  }

  h1 {
    font-weight: bold;
    font-size: 24px;
    color: #444;
  }

  /** Custom Scrollbar */
  #root *::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  #root *::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 30px;
  }

  #root *::-webkit-scrollbar-thumb {
    background: #ddd;
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

  /** Custom Toastify */
  .toast-container {
    border-radius: 4px;
    font-size: 16px;
  }

  .toast-container.Toastify__toast--error {
    background: #fb6f73;
  }

  .toast-container.Toastify__toast--success {
    background: #64ca67;
  }

  .toast-container button[aria-label="close"] {
    opacity: 1;

    &:hover {
      background: transparent;
    }
  }

  .toast-progressbar {
    background: #fff;
  }
`;
