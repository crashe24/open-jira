
import React, { ChangeEvent, useContext, useState } from 'react'

import { Box, Button, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AddCardIcon from '@mui/icons-material/AddCard';

import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {

   //const [isAdding, setisAdding] = useState(false);
   const [inputValue, setinputValue] = useState('');
   const [touch, settouch] = useState(false);

   const {addNewEntry} = useContext(EntriesContext);
   const {isAddingEntry,setIsAddingEntry} = useContext(UIContext)


   const handleChangeAdd = (addingRef:boolean) => {
        //setisAdding(addingRef)
        setIsAddingEntry(addingRef)
   }

   const onTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setinputValue( event.target.value)
   }

   const onSave = () => {
        if(inputValue.length === 0) return
        
        addNewEntry(inputValue)
        handleChangeAdd(false)
        settouch(false)
        setinputValue('')
   }

  return (
    <Box sx={{marginBottom:2, paddingX:1}}>

        {isAddingEntry
        ?(
            <>
                <TextField 
                    fullWidth
                    sx={{marginTop:2, marginBottom:1 }}
                    placeholder='New entry'
                    autoFocus
                    multiline
                    label={'Entry'}
                    helperText={inputValue.length<=0 && touch&&'  put a value'} 
                    error={ inputValue.length<=0 && touch}
                    value={inputValue}
                    onChange={ onTextFieldChange } 
                    onBlur={ ()=> settouch(true)}
                />
                <Box display={'flex'} justifyContent='space-between' >
                    <Button variant='text'  color='error'
                        endIcon={<CancelPresentationIcon />}
                        onClick= {()=>handleChangeAdd(false)}
                    > Cancel</Button>    
                    <Button variant='outlined' color='secondary'
                        endIcon={<SaveIcon
                             />}
                          onClick= {()=>onSave()}
                    > Save</Button>    
                </Box>
            </>
            )
            :(
                
                <Button startIcon={<AddCardIcon />} fullWidth variant='outlined'
                onClick={()=>handleChangeAdd(true)}> Add</Button>
        )}

       
    </Box>
  )
}

