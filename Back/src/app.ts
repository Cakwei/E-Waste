import express from 'express';
import AuthRoute from './routes/AuthRoute';
import cors from 'cors';
import config from './config/config';

const app = express();
app.use(
  cors({
    origin: config.nodeEnv === 'prod' ? '*' : 'http://localhost:5173',
  }),
);
app.use(express.json());

app.use('/', AuthRoute);

export default app;
