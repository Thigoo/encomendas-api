import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
});

app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
     console.log(`Servidor rodando na url: http://localhost:${PORT}`);     
});
