import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
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

  button {
    cursor: pointer;
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

  html, body, input, button {
    font: 16px 'Roboto', sans-serif;
  }

  /* font resizing */

  @media(max-width: 1366px) {
    html, body, input, button {
      font: 14px 'Roboto', sans-serif;
    }
  }

  @media(max-width: 1242px) {
    html, body, input, button {
      font: 12px 'Roboto', sans-serif;
    }
  }

  @media(max-width: 908px) {
    html, body, input, button {
      font: 10px 'Roboto', sans-serif;
    }
  }

  @media(max-width: 710px) {
    html, body, input, button {
      font: 13px 'Roboto', sans-serif;
    }
  }
`;
