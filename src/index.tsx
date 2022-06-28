import { StrictMode }              from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App        from './App';
import { render } from 'react-dom';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);