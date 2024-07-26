// app/api/sendEmail/route.js
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { to, fileId } = await req.json();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: to, // Recipient's email
    subject: 'File Ownership Transfer',
    text: `You are the new owner of the file with ID: ${fileId}.`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return new Response('Email sent successfully.', { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response('Error sending email.', { status: 500 });
  }
}
