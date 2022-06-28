import type { ComponentProps, FC } from 'react';

const NotificationList: FC<ComponentProps<'aside'>> = function (props) {
  return (
    <aside className={'notifications'} {...props} />
  );
};

export default NotificationList;