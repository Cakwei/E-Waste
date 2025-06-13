import { Request, Response } from 'express';
import {
  FindUserByEmail,
  FindUserByUsername,
  JWTPayload,
  VerifyToken,
} from './AuthController';
import jwt from 'jsonwebtoken';
import { connection } from '../server';

const changeUsername = async (req: Request, res: Response) => {
  let token: string | JWTPayload | boolean = req.cookies.auth;
  token = VerifyToken(token as string);
  if (token) {
    token = jwt.decode(token) as JWTPayload;
    const oldUsername = token.username;
    const { newUsername } = req.body;

    const email = token.email;

    const userExists =
      (await FindUserByEmail(email)).length > 0 &&
      (await FindUserByUsername(oldUsername)).length > 0;

    if (userExists) {
      const [result, field] = await connection.execute(
        'UPDATE accounts SET username = ? WHERE email = ? AND username = ?',
        [],
      );
      res.status(200).send({ result: true, message: 'Username changed' });
    }
  } else {
    res.status(401).send({ result: false, message: 'Invalid token' });
  }
};

export { changeUsername };
