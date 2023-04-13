// nextapi
import { db } from '@/database'
import entryModel, {iEntry} from '@/models/Entry'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = 
   | {message: string}
   | iEntry[]
   | iEntry


export default function handler (
    req: NextApiRequest, 
    res: NextApiResponse<Data>) {

        // two endpoints, one for create, two for get
        switch (req.method) {
            case 'GET':
                return getEntries(res)
                
            case 'POST':
                return postEntry( req, res)
                
        
            default:
                return res.status(400).json({message:'Error: endpoint not exist'})
        }

           // res.status(200).json({ message: 'Example' })
        }

const getEntries = async(res: NextApiResponse<Data> ) => {
        // connect db
        await db.connect()
        const entries = await entryModel.find().sort({createdAt: 'ascending'})
        await db.disconnect()
        res.status(200).json(entries)
}

const postEntry = async( req: NextApiRequest, 
    res: NextApiResponse<Data>) => {

        const { description = ''} = req.body
        // definir la entrada 
        const newEntry = new entryModel({
                description, 
                createAt: Date.now()
        })
        console.log('req.body()', req.body)
        try {
            db.connect()
            await newEntry.save()
            db.disconnect()
             // probar que el endpoint funciona
        return res.status(201).json(newEntry)
        } catch (error) {
            db.disconnect()
            console.log('error', error)
             // probar que el endpoint funciona
        return res.status(500).json({message:'Error: problem with create a entry'})
        }

       
    }