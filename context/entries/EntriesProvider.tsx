import { Entry } from '@/interfaces';
import { FC, useEffect, useReducer } from 'react';
import { EntriesContext, EntriesReducer } from './';
//import { v4 as uuidv4 } from 'uuid';
import entriesApi from '../../apis/entriesApi';
import { enqueueSnackbar } from 'notistack';

   export interface EntriesState {
        entries:Entry[]
  }
  export const Entries_INITIAL_STATE: EntriesState = {
         entries:[]
   }

  export const EntriesProvider:FC = ({children}) => {


  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

   // llenado de lo que se encuentra en la bdd de mongo
   useEffect(() => {
     const refreshEntries = async() => {
          const {data} = await entriesApi<Entry[]>('/entries');
          dispatch({type:'[Entry] - Refresh-Data', payload: data})
     }
     refreshEntries()
   }, []); 

  const addNewEntry = async ( description: string) => {
     /* const newEntry:Entry = {
          _id: uuidv4(),
          description, createAt: Date.now(),
          status:'pending'
      }*/

      const {data} = await entriesApi.post<Entry>('/entries', {description})
      dispatch({ type:'[Entry] - Add-Entry', payload:data})

     
     }

   //const updateEntry = async (entry:Entry) => {
   const updateEntry = async ({_id, description,status}: Entry, showSnackbar= false) => {
          try {
               const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, 
                    {description,status,
                    })
               dispatch({type:'[Entry] - Update-Entry', payload:data})
               if(showSnackbar) {

                    enqueueSnackbar('Entry updated', {
                                  variant: 'success',
                                  autoHideDuration:1500,
                                  anchorOrigin: {
                                   vertical: 'top', horizontal: 'right'
                                  } 
                    })
               }

          } catch (error) {
               console.log('error', error)
          }

   }  
         return (
             <EntriesContext.Provider value={{ ...state,
               // Methods 
               addNewEntry,
               updateEntry
               }}>
              {children}
         </EntriesContext.Provider>
        )
   }