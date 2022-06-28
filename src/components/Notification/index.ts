import { NotificationItem, NotificationList } from './components';

import './scss/style.scss';

const Notification = NotificationList as typeof NotificationList & {
  Item: typeof NotificationItem;
};

Notification.Item = NotificationItem;

export default Notification;