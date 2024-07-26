import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.connection;

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
