
import { Entry } from '@/interfaces';
import mongoose, {Model, Schema} from 'mongoose';

// interface iEntry {
//     _id: string;
//     description:string;
//     createAt:number;
//     status:EntryStatus;
// }

export interface iEntry extends Entry {}

const entrySchema = new Schema({
    description: {type:String, require:true},
    createAt: { type:Number},
    status: {
        type:String,
        enum: {
            values: ['pending','in-progress','finished'],
            message: '{VALUE} does not permit here'
        },
        default: 'pending'
    }

});

const entryModel: Model<iEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default entryModel;



