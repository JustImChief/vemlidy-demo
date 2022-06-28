import type { FC } from 'react';

import { useApp } from '../../../../providers';

import { NavigationItem } from './components';

const Navigation: FC<any> = function () {
  const {sections} = useApp();

  return (
    <ul className={'navigation'}>
      {sections.map((root, rootIndex) => (
        <NavigationItem
          key={rootIndex}
          {...root}
        />
      ))}
    </ul>
  );
};

export default Navigation;