// app/api/transfer/route.js

import { connectToDatabase } from '../../../lib/mongodb'; // Adjust the path if necessary
import File from '../../../models/File'; // Adjust the path if necessary

export async function POST(req) {
  try {
    const { to, fileId } = await req.json();

    await connectToDatabase();

    // Find the file document
    const file = await File.findOne({ fileId });
    if (!file) {
      return new Response('File not found', { status: 404 });
    }

    // Update the file document with the new owner
    const result = await File.updateOne(
      { fileId },
      { $set: { owner: to } }
    );

    if (result.matchedCount === 0) {
      return new Response('Failed to update ownership', { status: 500 });
    }

    return new Response('Ownership transferred successfully.', { status: 200 });
  } catch (error) {
    console.error('Error transferring ownership:', error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
