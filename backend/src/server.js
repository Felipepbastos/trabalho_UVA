import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import cepRoutes from './routes/cep.js';

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/cep', cepRoutes);

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Server running on ${port}`));
