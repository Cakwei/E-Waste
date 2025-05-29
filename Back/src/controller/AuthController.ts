import { Request, Response } from 'express';

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  console.log(username, password);
  res.send('Login Successful');
}

async function register(req: Request, res: Response) {
  // Your logic to retrieve users from a database or service
  res.write('fwefwf');
  res.send('Retrieving all users');
}

export { login, register };
