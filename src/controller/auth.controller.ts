import { Request, Response } from "express";
import { CreateSessionInput } from "../shema/auth.schema";
import { findUserByEmail, findUserById } from "../service/user.service";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) => {
  const message = "invalid email or password";

  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).send(message);
  }

  if (!user.verified) {
    return res.status(401).send("user not verified");
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.status(401).send(message);
  }

  const accessToken = signAccessToken(user);

  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });

  // send the tokens

  return res.send({
    accessToken,
    refreshToken,
  });
};

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res.status(401).send("invalid refresh token");
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send("could not refresh token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send("could not refresh token");
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}
