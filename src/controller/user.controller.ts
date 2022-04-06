import { Request, Response } from "express";
import {
  CreateUserInput,
  ForgotPasswordInput,
  VerifyUsernput,
} from "../shema/user.schema";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../service/user.service";
import sendEmail from "../utils/mailer";
import log from "../utils/logger";
import { nanoid } from "nanoid";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);
    await sendEmail({
      to: user.email,
      from: "codexpath3@gmail.com",
      subject: "verify your email to register",
      text: `verification code is ${user.verificationCode}. Id: ${user._id}`,
    });
    return res.send("user successfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("user already exists");
    }
    return res.status(500).send(e.message);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUsernput>,
  res: Response
) {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;

  const user = await findUserById(id);

  if (!user) {
    return res.send("user not found");
  }

  if (user.verified) {
    return res.send("user already verified");
  }

  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();
    return res.send("user verified");
  }

  if (user.verificationCode !== verificationCode) {
    return res.send("verification code is incorrect");
  }
  return res.send("user not verified");
}

export async function forgotPasswordHandler(
  req: Request<ForgotPasswordInput>,
  res: Response
) {
  const message =
    "if user is registered, a verification code will be sent to the user's email";
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    log.debug(`user with email ${email} not found`);
    return res.send(message);
  }
  if (!user.verified) {
    log.debug(`user with email ${email} not verified`);
    return res.send(message);
  }

  const passwordResetCode = nanoid();

  user.passwordResetCode = passwordResetCode;
  await user.save();

  await sendEmail({
    to: user.email,
    from: "test@gmail.com",
    subject: "reset your password",
    text: `reset code is ${passwordResetCode}. Id: ${user._id}`,
  });

  log.debug(`reset code sent to ${email}`);
  return res.send("reset code sent to user's email");
}
