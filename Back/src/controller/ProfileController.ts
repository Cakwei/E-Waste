import { Request, Response } from 'express';
import {
  FindUserByEmail,
  FindUserByUsername,
  jwt_secret,
  JWTPayload,
  VerifyToken,
} from './AuthController';
import jwt from 'jsonwebtoken';
import { connection } from '../server';
import config from '../config/config';

type IChangeUsername = {
  newUsername: string;
  currentUsername: string;
};

const changeUsername = async (req: Request, res: Response) => {
  try {
    let token: string | JWTPayload | boolean = req.cookies.auth;
    token = VerifyToken(token as string);
    if (token) {
      token = jwt.decode(token) as JWTPayload;
      delete token.iat, delete token.exp;

      const currentUsernameInDatabase = token.username;
      const {
        newUsername: newInputUsername,
        currentUsername: oldInputUsername,
      } = req.body as IChangeUsername;
      const email = req.params.email;
      const httpOnlyEmail = token.email;

      const userExists =
        (await FindUserByEmail(email)).length > 0 &&
        (await FindUserByUsername(currentUsernameInDatabase)).length > 0;

      if (
        userExists &&
        email === httpOnlyEmail &&
        currentUsernameInDatabase.toLowerCase() ===
          oldInputUsername.toLowerCase() &&
        newInputUsername &&
        newInputUsername !== oldInputUsername
      ) {
        const [result, field] = await connection.execute(
          'UPDATE accounts SET username = ? WHERE email = ? AND username = ?',
          [newInputUsername, email, currentUsernameInDatabase],
        );

        const newToken = jwt.sign(
          { ...token, username: newInputUsername },
          jwt_secret,
          { expiresIn: '1h' },
        );

        if (result)
          res.cookie('auth', newToken, {
            sameSite: 'lax',
            secure: config.nodeEnv === 'prod' ? true : false,
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });
        res.status(200).send({
          status: 'Success',
          data: { username: newInputUsername },
          message: 'Username changed',
        });
      } else {
        res.status(401).send({
          status: 'Error',
          data: {},
          message: 'Invalid inputs',
        });
      }
    } else {
      res
        .status(401)
        .send({ status: 'Error', data: {}, message: 'Invalid token' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'Error',
      data: {},
      message: 'Error occurred while changing username',
    });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    let token: string | JWTPayload | boolean = req.cookies.auth;
    token = VerifyToken(token as string);
    if (token) {
      token = jwt.decode(token) as JWTPayload;
      const email = req.params.email;
      const httpOnlyEmail = token.email;
      const username = token.username;
      const { newPassword } = req.body;

      const userExists =
        (await FindUserByEmail(email)).length > 0 &&
        (await FindUserByUsername(username)).length > 0;

      if (userExists && email === httpOnlyEmail) {
        const [result, field] = await connection.execute(
          'UPDATE accounts SET password = ? WHERE email = ? AND username = ?',
          [newPassword, email, username],
        );
      } else {
        res
          .status(401)
          .send({ status: 'Error', data: {}, message: 'Invalid token' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'Error',
      data: {},
      message: 'Error occurred while changing password',
    });
  }
};
export { changeUsername, changePassword };
