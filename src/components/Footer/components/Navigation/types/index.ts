import type { ComponentProps } from 'react';

import type { ISection } from '../../../../../providers/app';

export type TNavigationItem = Omit<ComponentProps<'li'>, 'children' | 'id'> & ISection;