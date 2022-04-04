import { Request, Response } from "express";
import { CreateUserInput } from "../shema/user.schema";
import { createUser } from "../service/user.service";
import sendEmail from "../utils/mailer";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);
    await sendEmail({
      from: "codexpath3@gmail.com",
      to: user.email,
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
