import mongoose from 'mongoose';

export const databaseConnect = async () => {
    try {
        const db_url = !process.env.NODE_ENV
                               ? process.env.DEV_DATABASE_URL
                               : process.env.PROD_DATABASE_URL; 
        await mongoose.connect(db_url!);
        console.log('Successful connection');
    } catch (error) {
        console.log(`Connection error: ${ error }`);
    }
}