import { connect, set } from 'mongoose';


// MongoDB Connection
export const mongoUri = (() => {
  const fromEnv = process.env.MONGODB_URI || process.env.MONGO_URI;
  const base = fromEnv || 'mongodb://admin:password123@mongodb:27017/tracksys'; // for dev
  // Ensure authSource=admin is present
  if (base.includes('authSource=')) return base;
  const hasQuery = base.includes('?');
  return base + (hasQuery ? '&' : '?') + 'authSource=admin';
})();


// connection to db
export const connectToDB = async () => {
  try {
    set('strictQuery', false);
    const db = await connect(mongoUri);
    console.log('MongoDB connected to', db.connection.name);
    // Emit an event when the connection is successful
  } catch (error) {
    console.error(error);
    // Emit an event when there's an error
  }
};