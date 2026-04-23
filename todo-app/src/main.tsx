import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App.tsx';
import { ThemeProvider } from '@/context/ThemeContext';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Искомый root-элемент не найден. Проверьте index.html');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
