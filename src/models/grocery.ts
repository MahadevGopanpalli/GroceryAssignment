import mongoose, { Schema } from 'mongoose';

const GroceryItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

export default mongoose.model('grocery', GroceryItemSchema);