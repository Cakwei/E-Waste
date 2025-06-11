import { Request, Response, Router } from 'express';
import { connection } from '../server';
const router = Router();

type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};

type FileWithPreview = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
};

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
  img: FileWithPreview[];
}

const CreateCollection = async (req: Request, res: Response) => {
  try {
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
      img,
    }: ICollection = req.body;

    connection.execute(
      'INSERT INTO collections (firstName, lastName, email, phoneNumber, building, streetAddress, city, state, wasteDescription, images) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        building,
        streetAddress,
        city,
        state,
        wasteDescription,
        img,
      ],
    );

    console.log('Success');
    res.send({ result: true, message: img });
  } catch (err) {
    console.log(err);
  }
};

const GetCollection = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    console.log(email);
    const [results] = await connection.execute(
      `
      SELECT images
      FROM accounts
      RIGHT JOIN collections
      ON accounts.email = collections.email WHERE  accounts.email = ?;
      `,
      [email],
    );
    res.send({ result: true, message: results });
  } catch (err) {
    console.log(err);
  }
};

export { CreateCollection, GetCollection };
