import { Request, Response, Router } from 'express';
const router = Router();

const CreateCollection = (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    building,
    streetAddress,
    city,
    country,
    wasteDescription,
  }: { [key: string]: string } = req.body;

  res.send({ message: firstName + ' ' + lastName });
};

export { CreateCollection };
