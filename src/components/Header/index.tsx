import type { FC } from 'react';

import './scss/style.scss';

import { useApp }        from '../../providers';
import { Button, Union } from '../../ui';

const Header: FC<any> = function () {
  const {currentSection} = useApp();

  return (
    <header>
      <Union />
      <div className={'container'}>
        <div className={'logo'}>
          <span />
        </div>
        <h1>{currentSection}</h1>
        <div className={'extra'}>
          <Button className={'doc'} />
          <Button className={'info'} />
        </div>
      </div>
    </header>
  );
};

export default Header;