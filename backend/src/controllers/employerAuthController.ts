import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../utils/auth";
import { AuthServiceInterface } from "../services/auth/authService";
import { EmployerRepository } from "../repositories/employerRepository";
import { EmployerRepositoryMongoDB } from "../app/database/repositories/employerRepositoryMongoDB";
import {
  registerEmployer,
  employerLogin,
} from "../services/auth/employerAuthService";
import { EmployerInterface } from "../types/employerInterface";
import { EmployerModel } from "../app/database/models/employerModel";
import {
  employerEmailVerification,
  verifyEmailOTP,
} from "../services/auth/employerAuthService";
import { EmailServiceInterface } from "../services/auth/emailService";
import {
  SendEmailService,
  sendEmailService,
} from "../utils/email";

const employerAuthController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  employerDbRepository: EmployerRepository,
  employerDbRepositoryImpl: EmployerRepositoryMongoDB,
  employer: EmployerModel,
  emailService: EmailServiceInterface,
  emailServiceImpl: SendEmailService
) => {
  const dbRepositoryEmployer = employerDbRepository(
    employerDbRepositoryImpl(employer)
  );
  const authService = authServiceInterface(authServiceImpl());
  const sendEmailService = emailService(emailServiceImpl());

  const employerRegister = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const employer: EmployerInterface = req.body;
      await registerEmployer(employer, dbRepositoryEmployer, authService);
      res.json({
        status: "success",
        message: "employer registered successfully",
      });
    }
  );

  const loginEmployer = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { email, password }: { email: string; password: string } = req.body;
      const token = await employerLogin(
        email,
        password,
        dbRepositoryEmployer,
        authService
      );
      res.json({
        status: "success",
        message: "employer verified",
        token,
      });
    }
  );

  const emailVerification = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const email = req.params.emailId;
      await employerEmailVerification(
        email,
        dbRepositoryEmployer,
        sendEmailService
      );
      res.json({ status: "success" });
    }
  );

  const OTPVerification = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const OTP = req.params.OTP;
      const response = await verifyEmailOTP(OTP, sendEmailService);
      if (response) {
        res.json({status: 'success', message: 'email verified'});
      }
    }
  );

  return {
    loginEmployer,
    employerRegister,
    emailVerification,
    OTPVerification
  };
};

export default employerAuthController;
