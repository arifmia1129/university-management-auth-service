import jwt, { Secret } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: Secret,
  expireTime: string,
): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
  return token;
};
