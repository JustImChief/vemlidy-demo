import { useContext } from 'react';

import type { IAppContext } from './types';

import { default as AppContext }  from './app.context';

function useMenu() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('`useApp` must be used within a AppProvider');
  }

  return context as IAppContext;
}

export default useMenu;
export { default as AppProvider } from './app.provider';
export { AppContext };

export type { ISection } from './types';