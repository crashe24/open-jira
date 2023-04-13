
import { UIState } from './';

type UIActionType = 
        | { type: 'UI - Open Sidebar'}
        | { type: 'UI - Close Sidebar'}
        | { type: 'UI - Set isAddingEntry', payload: boolean}
        | { type: 'UI - Start Draging'}
        | { type: 'UI - End Draging'}

export const UIReducer =(state: UIState, action: UIActionType ):UIState => {
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true,
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false,
            }
        case 'UI - Set isAddingEntry':
            return {
                ...state,
                isAddingEntry:action.payload
                
            }

        case 'UI - Start Draging': 
        return {
                ...state,
                isDraging: true
        }    
        case 'UI - End Draging': 
        return {
                ...state,
                isDraging: false
        }    

        default:
            return state;
    }

}
