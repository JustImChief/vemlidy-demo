import type { FC } from 'react';

import './assets/scss/style.scss';

import { Footer, Header, Notification } from './components';

import { AppProvider } from './providers';

const App: FC<any> = function () {
  return (
    <AppProvider>
      <Header />
      <main>
        <Notification>
          <Notification.Item
            label={'Подробнее про исследование TAF'}
            subject={'при компенсированном заболевании (F0-F4)'}
          />
          <Notification.Item
            label={'Подробнее про исследование TAF'}
            subject={'при декомпенсированном циррозе (F4)'}
          />
        </Notification>
      </main>
      <Footer />
    </AppProvider>
  );
};

export default App;