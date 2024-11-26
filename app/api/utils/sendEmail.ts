import nodemailer from 'nodemailer';


export const sendEmail = async (to: string, subject: string, html: string) => {
  // Set up the SMTP transport configuration
  const transporter = nodemailer.createTransport({
    host: 'mail.spacemail.com', // e.g., 'smtp.gmail.com' for Gmail
    port: Number(process.env.SMTP_PORT) || 0, // Use 465 for secure connections
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your SMTP username
      pass: process.env.SMTP_PASS, // Your SMTP password
    },
  });

  const mailOptions = {
    from: process.env.SUPPORT_EMAIL,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// export const sendEmail = async (to: string, subject: string, html: string) => {
//   const transporter = nodemailer.createTransport({
//     service: 'SendGrid',
//     auth: {
//       user: process.env.SENDER_USERNAME,
//       pass: process.env.SENDER_PASS,
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@example.com',
//     to,
//     subject,
//     html,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully.');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };
