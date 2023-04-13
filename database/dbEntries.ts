import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { Entry, iEntry } from '@/models';

export const getEntryById = async( id: string ): Promise<iEntry | null > => {
    if( !isValidObjectId(id)) return null
    
    await db.connect()
        const entry = await Entry.findById( id ).lean()

    await db.disconnect()

    return JSON.parse(JSON.stringify(entry))

}