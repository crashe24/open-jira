import { FC, useReducer } from 'react';
import { UIContext, UIReducer } from './';

   export interface UIState {
          sidemenuOpen:boolean,
          isAddingEntry:boolean,
          isDraging:boolean,
  }
  export const UI_INITIAL_STATE: UIState = {
  sidemenuOpen:false,
  isAddingEntry:false,
  isDraging:false,
   }
  export const UIProvider:FC = ({children}) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideMenu = () => (
     dispatch({type:'UI - Open Sidebar'})
  )

  const closeSideMenu = () => (
     dispatch({type:'UI - Close Sidebar'})
  )

  const setIsAddingEntry = ( isAdding:boolean)   => {
      dispatch({type:'UI - Set isAddingEntry', payload:isAdding})
  }

  const startDraging = () => {
      dispatch({type:'UI - Start Draging'})
  }

  const endDraging = () => {
      dispatch({type:'UI - End Draging'})
  }

         return (
             <UIContext.Provider value={
               { ...state,//sidemenuOpen:state.sidemenuOpen}
               // methods
               openSideMenu,
               closeSideMenu,
               setIsAddingEntry,
               startDraging,
               endDraging,
               }
               }>
              {children}
         </UIContext.Provider>
        )
   }
   