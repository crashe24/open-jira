
import { List, Paper } from '@mui/material'
import React, { DragEvent, FC, useContext, useMemo } from 'react'
import EntryCard from './EntryCard'
import { EntryStatus } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '@/context/ui';

import styles from './EntryList.module.css'


interface Props {
    status: EntryStatus
}


export const EntryList:FC<Props> = ({status}) => {

    const { entries, updateEntry } = useContext(EntriesContext);

    const {isDraging, endDraging }  = useContext(UIContext)


    const entriesByStatus = 
        useMemo(() => entries.filter( e => e.status === status ), [entries]);
    
    
const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    //console.log('event', event)
    const id = event.dataTransfer.getData('text')

    const ent = entries.find ( e=> e._id === id)!
    // cambiamos el estado 
    ent.status = status
    updateEntry(ent)
    endDraging()
   //console.log('id', id)
}

const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    //console.log('event', event)
    event.preventDefault()
}
  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop}
        className= {isDraging?styles.dragging:''}
    >
        <Paper sx={{height: 'calc( 100vh - 250px)', 
         backgroundColor:'transparent', padding:'1px 3px'}}>
                {/* Todo:cambiara cuando se esta haciendo drag */}
                <List sx={{opacity:isDraging?0.2:1, transition: 'all .3s'}}>
                     {entriesByStatus.map( ebe => (
                              <EntryCard key={ ebe._id} entry={ebe}/>

                     ))}   
    
                   
                      
                </List>
        </Paper>
    </div>
  )
}

