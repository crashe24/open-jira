
import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType = 
        | { type: '[Entry] - Add-Entry', payload: Entry}
        | { type: '[Entry] - Update-Entry', payload: Entry}
        | { type: '[Entry] - Refresh-Data', payload: Entry[]}

export const EntriesReducer =(state: EntriesState, action: EntriesActionType ):EntriesState => {
    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries:[...state.entries, action.payload]
            }
        case '[Entry] - Update-Entry':
            return {
                ...state,
                entries: state.entries.map(e => {
                    if (e._id === action.payload._id) {
                        e.status = action.payload.status
                        e.description = action.payload.description
                        }
                    return e
                })
            }
        case '[Entry] - Refresh-Data':
            return {
                ...state,
                entries: [...action.payload]
            }

        default:
            return state;
    }

}