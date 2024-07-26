"use client";
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function Home() {
  const [to, setTo] = useState('');
  const [fileId, setFileId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // First, send the ownership transfer request
    // const transferRes = await fetch('/api/transfer', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ to, fileId }),
    // });

    // const transferResult = await transferRes.text();

    // Then, send the email notification
    const emailRes = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, fileId }),
    });

    const emailResult = await emailRes.text();
    setMessage(`Email Result: ${emailResult}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Transfer Google Drive File Ownership</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block">
          To:
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mt-4">
          File ID:
          <input
            type="text"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Transfer Ownership
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      <a href='/' className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Sign out
      </a>
    </div>
  );
}
