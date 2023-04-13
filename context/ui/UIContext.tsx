import { createContext } from 'react';
export interface ContextProps {
      sidemenuOpen: boolean;
      isAddingEntry: boolean;
      isDraging: boolean;
      //methods
      openSideMenu: () => void;
      closeSideMenu: () => void;
      setIsAddingEntry: (isAdding: boolean) => void;
      startDraging: () => void; 
      endDraging: () => void;
}
export const UIContext = createContext({} as ContextProps)