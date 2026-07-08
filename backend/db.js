import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionName = process.env.INSTANCE_CONNECTION_NAME;
const config = {};

if (connectionName) {
  // Running in Cloud Run, connect via Unix Socket
  config.host = `/cloudsql/${connectionName}`;
  config.user = process.env.DB_USER || 'postgres';
  config.password = process.env.DB_PASS || 'vintagesecretpass';
  config.database = process.env.DB_NAME || 'postgres';
} else {
  // Running locally
  config.host = process.env.DB_HOST || '127.0.0.1';
  config.port = process.env.DB_PORT || 5432;
  config.user = process.env.DB_USER || 'postgres';
  config.password = process.env.DB_PASS || 'vintagesecretpass';
  config.database = process.env.DB_NAME || 'postgres';
}

console.log('Initializing DB Connection Pool with config:', {
  host: config.host,
  port: config.port,
  user: config.user,
  database: config.database,
  hasPassword: !!config.password
});

export const pool = new Pool(config);

// Test database connection helper
export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the Cloud SQL database!');
    client.release();
    return true;
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    return false;
  }
}
