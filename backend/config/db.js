import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI;
        const conn = await mongoose.connect(URI)
        console.log(`Mongo Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}