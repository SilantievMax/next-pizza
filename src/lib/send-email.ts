'use server';

import nodemailer from 'nodemailer';

interface SendMail {
  subject: string;
  fromEmail: string;
  toEmail: string | string[];
  text?: string;
  html?: string;
}

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

export async function sendMail(options: SendMail) {
  try {
    const { fromEmail, toEmail, subject, text = '', html } = options;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: SMTP_SERVER_HOST,
      port: 587,
      secure: true,
      auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject,
      text,
      html: html ? html : '',
    });

    // todo
    console.log('Message Sent', info, info.messageId);

    return info;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
