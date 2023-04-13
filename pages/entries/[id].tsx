import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { Button, Card, CardActions, CardContent, CardHeader, FormControl,
     FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize } from "@mui/material"

import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

import { Layout } from "@/components/layout"
import { Entry, EntryStatus } from "@/interfaces";


import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { getFormatDistanceToNow } from "@/utils/dateFunctions";

const validStatus: EntryStatus[] = ['pending','in-progress','finished']

interface Props {
    entry: Entry
}

const EntryPage: FC<Props> = ( { entry } ) => {

  const [inputValue, setInputValue] = useState(entry.description)  
  const [status, setStatus] = useState<EntryStatus>(entry.status)  
  const [touched, settouched] = useState(false)
  
  const { updateEntry } = useContext(EntriesContext)

  const isNotValid = useMemo(() => inputValue.length <=0 && touched, [inputValue, touched]);
  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('event.target.value', event.target.value)

        setStatus(event.target.value as EntryStatus)
  }

 const onSaved = () => {
    
    if(inputValue.trim().length === 0) return 

    const updatedEntry: Entry = {
        ...entry,
        status,
        description: inputValue
    } 
    updateEntry( updatedEntry, true)
 }

  return (
    <Layout title={ inputValue.substring(0,20) + '...'}>
        <Grid container justifyContent='center' sx={{marginTop: 2}}>
            <Grid item xs= { 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader
                        title={`Entry`}
                        subheader= {getFormatDistanceToNow(entry.createAt)}
                        // {` create : ${entry.createAt} minuts ago`}
                    />
                    <CardContent >
                        <TextField 
                            sx={{marginTop: 2, marginBottom:1}}
                            fullWidth
                            placeholder="New Entry"
                            autoFocus
                            multiline
                            label=" New Entry "
                            onChange={ onTextFieldChanged }
                            value={ inputValue}
                            onBlur={ ()=> settouched(true)}
                            helperText={ isNotValid && 'enter a value' }
                            error= { isNotValid }
                        />
                        <FormControl >
                            <FormLabel> State:</FormLabel>
                            <RadioGroup row
                                value={ status }
                                onChange={ onStatusChanged }

                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel key={option}
                                            value={option }    
                                            control={ <Radio /> }
                                            label={capitalize(option)}
                                            
                                        
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button 
                            startIcon={ <SaveAltOutlinedIcon />}
                            variant="contained"
                            fullWidth
                            onClick={onSaved}
                            disabled = { inputValue.length <= 0 }
                        >
                            save
                        </Button>

                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <IconButton sx={{position:'fixed', bottom: 20, right: 20,
                            backgroundColor: 'error.dark'
                        }}              >
                <RestoreFromTrashOutlinedIcon />
        </IconButton>
    </Layout>
  )
}

// se ejecuta en el lado del servidor
// el contexto es el del servidor
// You should use getServerSideProps when: 
// Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { id } = ctx.params as { id: string }

    const entryRef = await dbEntries.getEntryById( id )

    if (!entryRef) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    } 

    return {
        props: {
            entry: entryRef
        }
    }
}

export default EntryPage