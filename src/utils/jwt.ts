import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "resetTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signinKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );

  return jwt.sign(object, signinKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}
export function verifyJwt() {}
