import express from 'express';
import AuthRoute from './routes/AuthRoute';
import WasteRoute from './routes/WasteRoute';
import cookieParser from 'cookie-parser';
import ProfileRoute from './routes/ProfileRoute';
import { createServer } from 'http';
import cors from 'cors';
import config from './config/config';
const app = express();
app.use(
  cors({
    credentials: true,
    origin:
      config.nodeEnv === 'prod'
        ? 'https://wms.cakwei.com'
        : 'http://localhost:5173',
  }),
);
export const httpServer = createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use('/', AuthRoute);
app.use('/waste-collection', WasteRoute);
app.use('/users', ProfileRoute);

export default app;
