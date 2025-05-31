import { Request, Response, Router } from 'express';
const router = Router();

const createForm = (req: Request, res: Response) => {
  res.send({ result: true, message: 'Success' });
};
export { createForm };
