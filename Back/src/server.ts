import app from './app';
import config from './config/config';
import mysql from 'mysql2/promise';

// DB Connection
const connection = mysql.createPool({
  uri: config.db_url,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
