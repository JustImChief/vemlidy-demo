import { useMemo, useState } from 'react';

import type { FC } from 'react';

import type { IAppContext, IAppProvider, ISection } from './types';

import AppContext from './app.context';

const AppProvider: FC<IAppProvider> = function (props) {
  const [active, setActive] = useState(1);

  const value = useMemo<IAppContext>(() => {
    const sections: ISection[] = [
      {
        id:      1,
        label:   'Отсутствие фиброза',
        section: 'F0',
      },
      {
        id:      2,
        label:   'Слабый фиброз',
        section: 'F1',
      },
      {
        id:      3,
        label:   'Умеренный фиброз',
        section: 'F2',
      },
      {
        label:    'Гепатоцеллюлярная карцинома',
        children: [
          [
            {id: 4, label: 'Выраженный фиброз', section: 'F3'},
            {id: 5, label: 'Цирроз', section: 'F4'},
            {id: 6, label: 'Декомпенсация', categories: ['F4', 'Классы B и С по ЧП']},
          ],
          {id: 7, label: 'Трансплантация'},
        ],
      },
    ];

    function getCurrentSection(id = active) {
      return sections
        .reduce<ISection[]>((acc, cur) => {
          if (cur.children) {
            return cur.children.reduce<ISection[]>((acc, cur) => {
              if (Array.isArray(cur)) {
                return [...acc, ...cur];
              }

              return [...acc, cur];
            }, acc);
          }

          return [...acc, cur];
        }, [])
        .find((section) => id === section.id)!.label;
    }

    return {
      active,
      sections,
      currentSection: getCurrentSection(),
      setActive(section) {
        if (section !== active) {
          setActive(section);

          console.info(getCurrentSection(section));
        }
      },
    };
  }, [active]);

  return (
    <AppContext.Provider
      value={value}
      {...props}
    />
  );
};

export default AppProvider;