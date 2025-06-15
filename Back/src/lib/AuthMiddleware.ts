import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';

export const SECRET_KEY = config.jwt_secret;

export interface CustomRequest extends Request {
  token: string | JwtPayload | null;
}

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.auth;
    // const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      console.log('error');
      throw new Error();
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded) {
      next();
    }
    //(req as CustomRequest).token = decoded;
  } catch (err) {
    console.log(err);
    res.status(401).send({ result: false, message: 'Please authenticate.' });
  }
};
