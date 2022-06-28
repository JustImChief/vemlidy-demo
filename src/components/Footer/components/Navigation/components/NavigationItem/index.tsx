import classNames from 'classnames';

import type { FC } from 'react';

import type { TNavigationItem } from '../../types';

import { useApp } from '../../../../../../providers';

const NavigationItem: FC<TNavigationItem> = function ({
  categories,
  className,
  id,
  label,
  children,
  section,
  ...props
}) {
  const {active, setActive} = useApp();
  const hasChildren         = !!children?.length;

  return (
    <li
      className={classNames(className, hasChildren ? 'nav-root' : 'nav-item', {
        active: !hasChildren && active === id,
      })}
      {...props}
      onClick={() => {
        if (!hasChildren && id) {
          setActive(id);
        }
      }}
    >
      <i />
      {section?.length && (
        <div className={'section'}>{section}</div>
      )}
      <div>
        <div className={'label'}>{label}</div>
        {categories?.length && (
          <div className={'categories'}>
            {categories.join(', ')}
          </div>
        )}
      </div>
      {hasChildren && children.map((section, sectionIndex) => {
        if (Array.isArray(section)) {
          return (
            <ul className={'nav-section'} key={sectionIndex}>
              {section.map((item, itemIndex) => (
                <NavigationItem
                  key={itemIndex}
                  {...item}
                />
              ))}
            </ul>
          );
        }

        return (
          <ul className={'nav-section'} key={sectionIndex}>
            <NavigationItem
              className={'nav-item'}
              {...section}
            />
          </ul>
        );
      })}
    </li>
  );
};

export default NavigationItem;