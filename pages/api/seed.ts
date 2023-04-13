import { seedData } from '@/database/seed-data';
import entryModel from '@/models/Entry';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database/';

type Data = {
         message: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
   // depurar o purgar bdd no se debe ejcutar en produccion
   if ( process.env.NODE_ENV ==='production') {
      return res.status(401).json(
       {
             message: 'No tiene acceso a este servicio'
       }
      )
 }

   // conecta a la bdd
   await db.connect()
   // para cargar los datos iniciale en mongo
   await entryModel.deleteMany()
   await entryModel.insertMany(seedData.entries)
   await db.disconnect()
   res.status(200).json({ message: '***sucesss***' })
}