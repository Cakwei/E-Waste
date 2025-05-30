import { Request, Response } from 'express';
import { connection } from '../server';
import { QueryResult, RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config';

const jwt_secret = config.jwt_secret;

interface UserAccount extends RowDataPacket {
  username: string;
  email: string;
  password?: string;
}

async function Login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
      return;
    }

    const users = (await FindUserByUsername(username)) as UserAccount[];
    if (users.length === 0) {
      res.status(401).json({ result: false, message: 'Invalid credentials.' });
      return;
    }

    const user = users[0];
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      res.status(401).json({ result: false, message: 'Invalid credentials.' });
      return;
    }

    const token = jwt.sign(
      { username: user.username, email: user.email },
      jwt_secret,
      { expiresIn: '1h' },
    );

    res.status(200).json({ result: true, token: token });
  } catch (error) {
    console.error('Login error:', error);
    res
      .status(500)
      .json({ result: false, message: 'An internal server error occurred.' });
  }
}
async function Register(req: Request, res: Response) {
  // Your logic to retrieve users from a database or service
  res.write('fwefwf');
  res.send('Retrieving all users');
}

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

export { Login, Register };
