import mysql from 'mysql2/promise';
import 'dotenv/config';

// Create a connection pool. This is more efficient than creating a new connection
// for every query, as it reuses existing connections.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'testdb',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// A simple function to execute a query.
export const query = async (sql, params) => {
  const [results, ] = await pool.execute(sql, params);
  return results;
};

// Function to test the database connection
export const testConnection = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Database connection successful!');
    } catch (error) {
        console.error('❌ Could not connect to the database:', error.message);
        // Exit the process with an error code if the database connection fails.
        // This is crucial for container orchestration systems to know the container failed to start.
        process.exit(1);
    }
};
