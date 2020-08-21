import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
${css`
  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html,
  body,
  #root {
    height: 100vh;
  }

  body {
    background: #fff;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  button {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .container {
    width: 90vw;
    max-width: 700px;
  }

  @media (min: width:700px) {
    :root {
      font-size: 62.5%;
    }
  }
`}
`;
