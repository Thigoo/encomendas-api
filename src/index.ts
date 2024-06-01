import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
});

app.use(limiter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
     console.log(`Servidor rodando na url: http://localhost:${PORT}`);     
});
