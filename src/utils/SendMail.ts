import nodemailer from "nodemailer";

export interface IMailOption {
  to: string[];
  subject: string;
  text: string;
}

const sendMail = async (mailOptions: IMailOption) => {
  let transporter = nodemailer.createTransport({
    host: String(process.env.MAIL_HOST),
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.MAIL_FROM_NAME!}" 👻" ${process.env.MAIL_FROM}`,
    to: mailOptions.to,
    subject: mailOptions.subject,
    text: mailOptions.text,
  });

  console.log("Message sent: %s", info.messageId);
};

export default sendMail;
