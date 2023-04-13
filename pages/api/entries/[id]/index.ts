import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '@/database';
import { Entry } from '@/models';
import { iEntry } from '../../../../models/Entry';

type Data =
 { message: string }
 | iEntry
 

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id} = req.query;

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message:'El id no es valido'})
    }

    switch (req.method) {
        case 'GET':
                return getEntryToId(req, res)
        case 'PUT':
                return updateEntry(req, res)
    
        default:
            res.status(400).json({ message: 'Metodo no existe' })
            break;
    }
    
}


const getEntryToId = async (req: NextApiRequest, res: NextApiResponse<Data> ) => {
        const { id } = req.query 
        await db.connect()

        const {_doc} = await Entry.findById(id)
        await db.disconnect()
        console.log('entryToId', _doc)
        if (!_doc) {
            return res.status(201).json({message: 'Entrada no existe'})    
        }
        return res.status(201).json(_doc)
        
}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
        const { id } = req.query

        await db.connect()

        const entryToUpdate = await Entry.findById(id)

        if (!entryToUpdate) {
            await db.disconnect()
           return  res.status(400).json({ message: 'No existe la entrada con ese id' })
        }

        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status,

        } = req.body

        try {
            const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators:true, new:true})
            await db.disconnect()
            res.status(200).json(updatedEntry!)

        } catch (error: any) {
            console.log('error', error.errors.status.message)
            await db.disconnect()
            res.status(400).json({message:'No se puede actualizar la entrada'})

        }

        
}

