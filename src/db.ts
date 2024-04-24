import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
        });
        console.log('DB Connected----',process.env.MONGO_URI);
    } catch (error) {
        console.error('DB Connection Error:', error);
        process.exit(1);
    }
};
