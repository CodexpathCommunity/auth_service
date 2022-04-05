import { Request, Response } from "express";
import { CreateUserInput, VerifyUsernput } from "../shema/user.schema";
import { createUser, findUserById } from "../service/user.service";
import sendEmail from "../utils/mailer";
import log from "../utils/logger";

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
