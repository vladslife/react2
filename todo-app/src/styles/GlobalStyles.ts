import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => (theme === 'light' ? '#f0f2f5' : '#1a1a1a')};
    font-family: -apple-syste, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: background-color 0.3s ease;
  }
`;
