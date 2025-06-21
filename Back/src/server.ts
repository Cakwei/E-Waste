import { httpServer } from './app';
import config from './config/config';
import mysql from 'mysql2/promise';
import { v2 as cloudinary } from 'cloudinary';
import { Server } from 'socket.io';

// DB Connection
export const connection = mysql.createPool({
  uri: config.db_url,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const cloudinaryConfig = cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const io = new Server(httpServer, {
  cors: {
    origin:
      config.nodeEnv === 'prod'
        ? 'https://wms.cakwei.com'
        : 'http://localhost:5173',
  },
});

httpServer.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

io.on('connection', (socket) => {
  socket.on('updateViewRequest', () => {
    console.log('From server');
    io.emit('updateViewRequest');
  });
});
