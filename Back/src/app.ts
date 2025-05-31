import express from 'express';
import AuthRoute from './routes/AuthRoute';
import WasteRoute from './routes/WasteRoute';
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
app.use('/waste', WasteRoute);
export default app;
