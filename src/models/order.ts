import mongoose, { Schema } from 'mongoose';

const order: Schema = new Schema({
   userId  : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
   items : [
    {
        _id : { type: mongoose.Schema.Types.ObjectId, ref: 'grocery' },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }
    ]
});

export default mongoose.model('order', order);