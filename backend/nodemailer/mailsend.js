import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "nikesha.silva29@gmail.com",
    pass: "yfdl ixgr kaox fsne",
  },
});

export const sendMail = (to, sub, msg) => {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });

  console.log("Email send");
};

//sendMail("nikeshaf19@gmail.com", "New User Added", "This is test message");
