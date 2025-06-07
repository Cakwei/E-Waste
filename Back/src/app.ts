import express from 'express';
import AuthRoute from './routes/AuthRoute';
import WasteRoute from './routes/WasteRoute';
import cors from 'cors';
import config from './config/config';
import cookieParser from 'cookie-parser';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: config.nodeEnv === 'prod' ? 'https://wms.cakwei.com' : 'http://localhost:5173',
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/', AuthRoute);
app.use('/waste', WasteRoute);
export default app;
