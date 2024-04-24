import mongoose, { Schema } from 'mongoose';

const User: Schema = new Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: Number, required: true },
});

export default mongoose.model('user', User);