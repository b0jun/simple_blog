import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import config from './config';
import postRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';
import searchRoutes from './routes/api/search';

const app = express();
const { MONGO_URI } = config;
const prod = process.env.NODE_ENV === 'production';

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
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connection Success'))
  .catch((e) => console.log(e));

app.get('/');
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

//프론트주소는 아래를 통해 받음
if (prod) {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}
export default app;
