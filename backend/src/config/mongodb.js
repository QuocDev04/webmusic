import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // Đảm bảo rằng bạn đã tải tệp .env

const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env file");
        }

        // Kết nối đến MongoDB mà không sử dụng các tùy chọn đã lỗi thời
        await mongoose.connect(`${MONGODB_URI}/spotify`);

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Kết thúc chương trình nếu không thể kết nối
    }
};

export default connectDB;
