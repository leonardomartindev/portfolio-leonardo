import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou outro serviço de email
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nova mensagem de ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email enviado com sucesso!' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Erro ao enviar email' }), { status: 500 });
  }
}
