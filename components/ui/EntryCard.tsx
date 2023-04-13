
import { UIContext } from '@/context/ui'
import { Entry } from '@/interfaces'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { DragEvent, FC, useContext } from 'react'

import { getFormatDistanceToNow } from '@/utils/dateFunctions'

interface Props {
  entry: Entry
}

const EntryCard:FC<Props> = ({entry}) => {

  const {startDraging,endDraging} = useContext(UIContext)

  const router = useRouter()

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {

        event.dataTransfer.setData('text', entry._id)
        // todo_ modificar le estado para saber que estoy haciendo el drag
        startDraging()

  }

  const onDragEnd = () => {
      // todo: cancelar el drag
     endDraging()
  }

  const redirectEditEntry = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card sx={{marginBottom:1}}
            // Eventos de drag
            draggable
            onDragStart = { onDragStart }
            onDragEnd = { onDragEnd }
            onClick={ redirectEditEntry}
    >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line'}}>{entry.description}</Typography>
                </CardContent>
                <CardActions>
                    <Typography variant='body2' sx={{display: 'flex', 
                    justifyContent:'end', paddingRight:2}}>{getFormatDistanceToNow(entry.createAt)}</Typography>
                </CardActions>
            </CardActionArea>
    </Card>
  )
}

export default EntryCard