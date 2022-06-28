import type { FC } from 'react';

import './scss/style.scss';

import Button from '../../ui/Button';

import { Navigation } from './components';

const Footer: FC<any> = function () {
  return (
    <footer>
      <div className={'container'}>
        <Navigation />
        <Button onClick={() => console.info('Help!!!')}>?</Button>
      </div>
    </footer>
  );
};

export default Footer;