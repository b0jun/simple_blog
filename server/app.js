import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import postRoutes from './routes/api/post';
import userRouter from './routes/api/user';
import authRoutes from './routes/api/auth';

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connection Success'))
  .catch((e) => console.log(e));

app.get('/');
app.use('/api/post', postRoutes);
app.use('/api/user', userRouter);
app.use('/api/auth', authRoutes);

export default app;
