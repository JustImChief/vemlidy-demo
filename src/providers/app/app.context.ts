import { createContext } from 'react';

import type { IAppContext } from './types';

const AppContext = createContext<Partial<IAppContext>>({});

export default AppContext;