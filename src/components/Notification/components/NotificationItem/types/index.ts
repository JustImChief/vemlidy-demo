import { ComponentProps } from 'react';

export interface INotification extends ComponentProps<'div'> {
  label: string;
  subject: string;
}