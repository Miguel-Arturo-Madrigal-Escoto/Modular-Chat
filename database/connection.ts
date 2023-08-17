import mongoose from 'mongoose';

export const databaseConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log('Successful connection');
    } catch (error) {
        console.log(`Connection error: ${ error }`);
    }
}