// utils/transfer.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function transferOwnership(auth, fileId, newOwnerEmail) {
  try {
    await client.connect();
    const database = client.db('transferOwnership');
    const filesCollection = database.collection('files');

    // Find the file document
    const file = await filesCollection.findOne({ fileId });
    if (!file) {
      throw new Error('File not found');
    }

    // Update the file document with the new owner
    const result = await filesCollection.updateOne(
      { fileId },
      { $set: { owner: newOwnerEmail } }
    );

    if (result.matchedCount === 0) {
      throw new Error('Failed to update ownership');
    }
  } catch (error) {
    console.error('Error transferring ownership:', error);
    throw error;
  } finally {
    await client.close();
  }
}
