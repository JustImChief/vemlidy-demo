import { ProviderProps } from 'react';

export interface IAppContext {
  active: number;
  currentSection: string;
  sections: ISection[];

  setActive(section: number): void;
}

export interface IAppProvider extends Omit<ProviderProps<any>, 'value'> {
}

export interface ISection {
  active?: boolean;
  categories?: string[];
  children?: (ISection | ISection[])[];
  id?: number;
  label: string;
  section?: string;
}