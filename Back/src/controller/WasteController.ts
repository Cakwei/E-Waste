import { Request, Response, Router } from 'express';
import { connection } from '../server';
const router = Router();

interface ICollection {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  building: string;
  streetAddress: string;
  city: string;
  state: string;
  wasteDescription: string;
}

const CreateCollection = (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    building,
    streetAddress,
    city,
    state,
    wasteDescription,
  }: ICollection = req.body;

  //connection.execute();
};

export { CreateCollection };
