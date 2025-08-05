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
import { FieldPacket, ResultSetHeader } from 'mysql2';
import bcrypt from 'bcrypt';

type IChangeUsername = {
  newUsername: string;
  currentUsername: string;
};

const changeUsername = async (req: Request, res: Response) => {
  try {
    let token: string | JWTPayload | boolean = req.cookies.auth;
    token = VerifyToken(token as string);

    // If there is token
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

      // If user exists
      const userExists =
        (await FindUserByEmail(email)).length > 0 &&
        (await FindUserByUsername(currentUsernameInDatabase)).length > 0;

      // Validation
      if (
        userExists &&
        email === httpOnlyEmail &&
        oldInputUsername &&
        newInputUsername &&
        currentUsernameInDatabase.toLowerCase() ===
          oldInputUsername.toLowerCase() &&
        newInputUsername !== oldInputUsername
      ) {
        const [result, field] = await connection.execute(
          'UPDATE accounts SET username = ? WHERE email = ? AND username = ?',
          [newInputUsername, email, currentUsernameInDatabase],
        );

        // If row updated
        if (result) {
          const newToken = jwt.sign(
            { ...token, username: newInputUsername },
            jwt_secret,
            { expiresIn: '1h' },
          );
          /*
          res.cookie('auth', newToken, {
            sameSite: 'lax',
            secure: config.nodeEnv === 'prod' ? true : false,
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });*/
          res.clearCookie('auth');
          res.status(200).send({
            status: 'Success',
            data: { username: newInputUsername },
            message: 'Username changed',
          });
        } else {
          throw Error();
        }
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

    // Check for token
    if (token) {
      token = jwt.decode(token) as JWTPayload;
      const email = req.params.email;
      const httpOnlyEmail = token.email;
      const username = token.username;
      const {
        currentPassword: oldInputPassword,
        newPassword: newInputPassword,
      } = req.body;
      const userExists =
        (await FindUserByEmail(email)).length > 0 &&
        (await FindUserByUsername(username)).length > 0;
      const user = (await FindUserByEmail(email))[0];
      const matchPassword = await bcrypt.compare(
        oldInputPassword,
        user.password,
      );

      // Validation
      if (
        userExists &&
        email === httpOnlyEmail &&
        oldInputPassword &&
        matchPassword &&
        newInputPassword &&
        oldInputPassword !== newInputPassword
      ) {
        const hashSaltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(
          newInputPassword,
          hashSaltRounds,
        );

        const [result, field]: [ResultSetHeader, FieldPacket[]] =
          await connection.execute(
            'UPDATE accounts SET password = ? WHERE email = ? AND username = ?',
            [hashedNewPassword, email, username],
          );

        if (result.affectedRows > 0) {
          res.clearCookie('auth');
          res.status(200).send({
            status: 'Success',
            data: {},
            message: 'Password changed',
          });
          return;
        }

        res.status(400).send({
          status: 'Error',
          data: {},
          message: 'Failed to change password',
        });
        return;
      } else {
        res
          .status(401)
          .send({ status: 'Error', data: {}, message: 'Invalid input(s)' });
        return;
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

async function changeEmail(req: Request, res: Response) {
  let token = req.cookies.auth;
  token = VerifyToken(token);
  if (token) {
    const { currentEmail: oldEmailInput, newEmail: newEmailInput } = req.body;
    const email = req.params.email;
    const httpOnlyEmail = (jwt.decode(token) as JWTPayload).email;
    console.log(email, oldEmailInput);
    // Validation
    if (
      email &&
      email === httpOnlyEmail &&
      oldEmailInput &&
      email === oldEmailInput &&
      newEmailInput &&
      oldEmailInput !== newEmailInput
    ) {
      const [result]: [ResultSetHeader, FieldPacket[]] =
        await connection.execute(
          'UPDATE accounts SET email = ? WHERE email = ?',
          [newEmailInput, oldEmailInput],
        );
      if (result) {
        res.clearCookie('auth');
        res.status(200).send({
          status: 'Success',
          data: {},
          message: 'Email changed',
        });
        return;
      }
    } else {
      res
        .status(401)
        .send({ status: 'Error', data: {}, message: 'Invalid input(s)' });
      return;
    }
  } else {
    res.status(401).send({
      status: 'Error',
      data: {},
      message: 'Invalid token',
    });
    return;
  }
}
export { changeUsername, changePassword, changeEmail };
