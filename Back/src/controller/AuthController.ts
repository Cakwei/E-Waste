import { Request, Response } from 'express';
import { connection } from '../server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

export const jwt_secret = config.jwt_secret;

interface UserAccount extends RowDataPacket {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface JWTPayload extends JwtPayload {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
async function Login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        status: 'Error',
        data: {},
        message: 'Username and password are required.',
      });
      return;
    }

    if (!validateEmailFormat(email)) {
      res.status(400).send({
        status: 'Error',
        data: {},
        message: 'Invalid email format.',
      });
      return;
    }

    const userExists =
      ((await FindUserByEmail(email)) as UserAccount[]).length > 0;

    if (!userExists) {
      res
        .status(401)
        .send({ status: 'Error', data: {}, message: 'Invalid credentials.' });
      return;
    }

    const users = (await FindUserByEmail(email)) as UserAccount[];

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password); //password === user.password;

    if (!passwordMatch) {
      res
        .status(401)
        .send({ status: 'Error', data: {}, message: 'Invalid credentials.' });
      return;
    }

    const token = SignToken(user);
    res.cookie('auth', token, {
      sameSite: 'lax',
      secure: config.nodeEnv === 'prod' ? true : false,
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send({
      status: 'Success',
      data: {
        token: token,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      message: 'Login successful.',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({
      status: 'Error',
      data: {},
      message: 'An internal server error occurred.',
    });
  }
}

async function Register(req: Request, res: Response) {
  try {
    const hashSaltRounds = 10;
    const { username, email, password, firstName, lastName } = req.body;
    if (
      username === '' &&
      email === '' &&
      password === '' &&
      firstName === '' &&
      lastName === ''
    ) {
      res
        .status(400)
        .send({ status: 'Error', data: {}, message: 'All input is required' });
      return;
    }

    if (!validateEmailFormat(email)) {
      res.status(400).send({
        status: 'Error',
        data: {},
        message: 'Invalid email format.',
      });
      return;
    }

    const accountExists =
      ((await FindUserByEmail(email)) as UserAccount[]).length > 0 ||
      ((await FindUserByUsername(username)) as UserAccount[]).length > 0;
    if (accountExists) {
      res
        .status(409)
        .send({ status: 'Error', data: {}, message: 'Account already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, hashSaltRounds);
    const [rows, fields] = await connection.execute(
      'INSERT INTO `accounts` (email, firstName, lastName, username, password) VALUES (?, ?, ?, ?, ?)',
      [email, firstName, lastName, username, hashedPassword],
    );
    if ((rows as ResultSetHeader).affectedRows > 0) {
      res
        .status(201)
        .send({ status: 'Success', data: {}, message: 'Account created' });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: 'Error', data: {}, message: 'Failed to create account' });
  }
}
async function ChangeUsername(req: Request, res: Response) {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'Error',
      data: {},
      message: 'Failed to change username',
    });
  }
}

async function RefreshSession(req: Request, res: Response) {
  try {
    let token = req.cookies.auth;
    if (token) {
      token = VerifyToken(token);
      if (!token) {
        res.status(401).send({
          status: 'Error',
          data: {},
          message: 'Token invalid. Please login again.',
        });
        return;
      }
      token = SignToken(jwt.decode(token) as JWTPayload);
      res.cookie('auth', token, {
        sameSite: 'lax',
        secure: config.nodeEnv === 'prod' ? true : false,
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).send({
        status: 'Success',
        data: {
          token: token,
          username: (jwt.verify(token, jwt_secret) as JWTPayload).username,
          email: (jwt.verify(token, jwt_secret) as JWTPayload).email,
          firstName: (jwt.verify(token, jwt_secret) as JWTPayload).firstName,
          lastName: (jwt.verify(token, jwt_secret) as JWTPayload).lastName,
          role: (jwt.verify(token, jwt_secret) as JWTPayload).role,
        },
        message: 'Session retrieved',
      });
    } else {
      res.clearCookie('auth');
      res.status(401).send({
        status: 'Error',
        data: {},
        message: 'Access unauthorized. Please login again.',
      });
    }
  } catch (err) {
    res.clearCookie('auth');
    res.status(500).send({
      status: 'Error',
      data: {},
      message: 'Failed to refresh session due to internal server error',
    });
  }
}

const Logout = (req: Request, res: Response) => {
  res.clearCookie('auth');
  res.status(200).send({ status: 'Success', data: {}, message: 'Logged out' });
};

// Private Functions
export async function FindUserByEmail(email: string) {
  const [rows, fields] = await connection.execute(
    'SELECT * FROM `accounts` WHERE `email` = ?',
    [email],
  );
  return rows as UserAccount[];
}
export async function FindUserByUsername(username: string) {
  const [rows, fields] = await connection.execute(
    'SELECT * FROM `accounts` WHERE `username` = ?',
    [username],
  );
  return rows as UserAccount[];
}

// Token functions
export const VerifyToken = (token: string) => {
  // Note: Throws error if cant verify
  try {
    const result = jwt.verify(token, jwt_secret);
    return result ? token : false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const validateEmailFormat = (email: string) => {
  const emailRegexExpression =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegexExpression.test(email);
};

export const SignToken = (data: JWTPayload) => {
  const token = jwt.sign(
    {
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    },
    jwt_secret,
    { expiresIn: '1h' },
  );
  return token;
};

export { Login, Register, RefreshSession, Logout };
