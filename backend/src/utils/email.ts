import nodemailer, { Transporter } from "nodemailer";
import configKeys from "../config";

export const sendEmailService = () => {
  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
   secure: true,
    auth: {
      user: "truong22082002@gmail.com",
      pass: "ytmt hanr lauo iabj",
    },
  });

  let otp: string | null;

  const sendEmail = (email: string) => {
    otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpData = {
      email,
      otp,
    };
    setTimeout(() => {
      otp = null;
    }, 120000);

    console.log(otpData);
    const mailOptions = {
      from: "truong22082002@gmail.com",
      to: email,
      subject: "OTP for Login",
      text: `Your OTP for login is: ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  };

  const verifyOTP = (OTP: string) => {
    if (OTP == otp) {
      return { message: "OTP verified" };
    } else if (otp == null) {
      return { message: "OTP is expired" };
    } else {
      return { message: "OTP is invalid" };
    }
  };
  return {
    sendEmail,
    verifyOTP,
  };
};

export type SendEmailService = typeof sendEmailService;
