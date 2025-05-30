import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  db_url: string;
  jwt_secret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.VITE_DEPLOYMENT_MODE || 'dev',
  db_url: process.env.DB_URL || '',
  jwt_secret: process.env.VITE_JWT_SECRET || '',
};
export default config;
