import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req) {
  console.log('Received request:', req); // Add this line for debugging

  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error); // Add this line for debugging
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
