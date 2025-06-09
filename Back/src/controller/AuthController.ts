import { Request, Response } from 'express';
import { connection } from '../server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

const jwt_secret = config.jwt_secret;

interface UserAccount extends RowDataPacket {
  username: string;
  email: string;
  password: string;
}

interface JWTPayload extends JwtPayload {
  username: string;
  email: string;
}
async function Login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send({
        success: false,
        message: 'Username and password are required.',
      });
      return;
    }

    const users = (await FindUserByUsername(username)) as UserAccount[];
    if (users.length === 0) {
      res.status(401).send({ result: false, message: 'Invalid credentials.' });
      return;
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password); //password === user.password;

    if (!passwordMatch) {
      res.status(401).send({ result: false, message: 'Invalid credentials.' });
      return;
    }

    const token = jwt.sign(
      { username: user.username, email: user.email },
      jwt_secret,
      { expiresIn: '1h' },
    );
    res.cookie('auth', token, {
      sameSite: 'lax',
      secure: config.nodeEnv === 'prod' ? true : false,
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send({
      result: true,
      token: token,
      message: 'Login successful.',
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Login error:', error);
    res
      .status(500)
      .send({ result: false, message: 'An internal server error occurred.' });
  }
}

async function Register(req: Request, res: Response) {
  try {
    const hashSaltRounds = 10;
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      res.status(400).send({ result: false, message: 'All input is required' });
      return;
    }
    const accountExists =
      ((await FindUserByEmail(email)) as UserAccount[]).length > 0 ||
      ((await FindUserByUsername(username)) as UserAccount[]).length > 0;
    if (accountExists) {
      res
        .status(409)
        .send({ result: false, message: 'Account already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, hashSaltRounds);
    const [rows, fields] = await connection.execute(
      'INSERT INTO `accounts` VALUES (?, ?, ?)',
      [email, username, hashedPassword],
    );
    if ((rows as ResultSetHeader).affectedRows > 0) {
      res.status(201).send({ result: true, message: 'Account created' });
    }
  } catch (err) {
    res
      .status(500)
      .send({ result: false, message: 'Failed to create account' });
  }
}

async function RefreshSession(req: Request, res: Response) {
  try {
    let { token } = req.body;
    if (token) {
      token = jwt.verify(token, jwt_secret, (err: any, decoded: any) => {
        if (err) {
          res.status(401).send({
            result: false,
            message: 'Token invalid. Please login again.',
          });
          return;
        }
        if (decoded) {
          res.cookie('auth', token, {
            sameSite: 'lax',
            secure: config.nodeEnv === 'prod' ? true : false,
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });
          res.status(200).send({
            result: true,
            token: token,
            message: 'Session retrieved',
            username: (jwt.verify(token, jwt_secret) as JWTPayload).username,
            email: (jwt.verify(token, jwt_secret) as JWTPayload).email,
          });
        }
      });
    } else {
      res.status(401).send({
        result: false,
        message: 'Access unauthorized. Please login again.',
      });
    }
  } catch (err) {
    res.status(500).send({
      result: false,
      message: 'Failed to refresh session due to internal server error',
    });
  }
}

const Logout = (req: Request, res: Response) => {
  res.clearCookie('auth');
  res.status(200).send({ result: true, message: 'Logged out' });
};
// Private Functions
async function FindUserByEmail(email: string) {
  const [rows, fields] = await connection.execute(
    'SELECT * FROM `accounts` WHERE `email` = ?',
    [email],
  );
  return rows;
}
async function FindUserByUsername(username: string) {
  const [rows, fields] = await connection.execute(
    'SELECT * FROM `accounts` WHERE `username` = ?',
    [username],
  );
  return rows;
}

export { Login, Register, RefreshSession, Logout };
