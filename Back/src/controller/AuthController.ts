import { Request, Response } from 'express';
import { connection } from '../server';
import { QueryResult } from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config';

const jwt_secret = config.jwt_secret;
async function Login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const rowExists =
      ((await FindUserByUsername(username)) as Array<QueryResult>).length > 0;
    if (rowExists) {
      const [rows, fields] = await connection.execute(
        'SELECT * FROM `accounts` WHERE `username` = ? AND `password` = ?',
        [username, password],
      );
      return rows
        ? res.status(201).send({ result: true, message: 'Login successful' })
        : res
            .status(401)
            .send({ result: false, message: 'Wrong username/password.' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ result: false, message: 'Something went wrong.' });
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
