import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connectado com sucesso');
  } catch (err) {
    console.error('Erro ao conectar com MongoDB');
    process.exit(1);
  }
};

export default connectDB;
