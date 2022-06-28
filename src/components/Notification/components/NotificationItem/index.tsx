import classNames from 'classnames';

import type { FC } from 'react';

import type { INotification } from './types';

const NotificationItem: FC<INotification> = function ({children, className, label, subject, ...props}) {
  return (
    <div className={classNames('notify', className)} {...props}>
      <div className={'label'}>{label}</div>
      <div className={'subject'}>{subject}</div>
    </div>
  );
};

export default NotificationItem;