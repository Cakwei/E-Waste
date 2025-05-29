import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  db_url: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.VITE_DEPLOYMENT_MODE || 'dev',
  db_url: process.env.DB_URL || '',
};
export default config;
