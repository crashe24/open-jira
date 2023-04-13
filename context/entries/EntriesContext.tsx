import { Entry } from '@/interfaces';
import { createContext } from 'react';
export interface ContextProps {
      entries: Entry[]; // falta el tipo de  dato del arreglo
      addNewEntry: (description: string) => void
      updateEntry: (entry: Entry, showSnackbar?:boolean) => void; 
}
export const EntriesContext = createContext({} as ContextProps)