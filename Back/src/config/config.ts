import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  db_url: string;
  jwt_secret: string;
  cloudinary_cloud_name: string;
  cloudinary_api_key: string;
  cloudinary_api_secret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.VITE_DEPLOYMENT_MODE || 'dev',
  db_url: process.env.DB_URL || '',
  jwt_secret: process.env.VITE_JWT_SECRET || '',
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY || '',
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || '',
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
};
export default config;
