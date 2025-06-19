import { Request, Response } from 'express';
import { cloudinaryConfig, connection } from '../server';
import { RowDataPacket } from 'mysql2/promise';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

/*
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
*/
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
  img: any;
}

const CreateCollection = async (req: Request, res: Response) => {
  let imageLinksArray: string[] = [],
    imagePublicIdArray: string[] = [], // For deletion purposes from cloudinary incase error occurs
    base64File;
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
    }: ICollection = req.body;
    const uuid = uuidv4();
    const files = req.files as Express.Multer.File[];

    if (!(Array.isArray(req.files) && files.length > 0)) {
      res
        .status(400)
        .send({ result: false, message: 'At least  one image is required' });
      return;
    }

    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phoneNumber === '' ||
      building === '' ||
      streetAddress === '' ||
      city === '' ||
      state === '' ||
      wasteDescription === ''
    ) {
      res
        .status(400)
        .send({ result: false, message: 'One or more input is empty' });
      return;
    }

    for (let x of files) {
      const mimetype = x.mimetype;
      const buffer = x.buffer;
      base64File = `data:${mimetype};base64,${buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(
        base64File,
        cloudinaryConfig,
      );
      imageLinksArray.push(result.secure_url);
      imagePublicIdArray.push(result.public_id);
    }

    const result = await connection.execute(
      'INSERT INTO collections (id, email, phoneNumber, building, streetAddress, city, state, wasteDescription, images, creationdate) VALUES (?,?,?,?,?,?,?,?,?, NOW())',
      [
        uuid,
        email,
        phoneNumber,
        building,
        streetAddress,
        city,
        state,
        wasteDescription,
        imageLinksArray,
      ],
    );

    res.status(201).send({ result: true, message: 'Request created' });
  } catch (err) {
    console.log(err);
    if (imageLinksArray.length > 0) {
      for (let publicId of imagePublicIdArray) {
        cloudinary.uploader.destroy(publicId).then((result) => {
          console.log(result);
        });
      }
    }
    res
      .status(500)
      .send({ result: false, message: 'Failed to create request' });
  }
};

const GetAllOfUserCollection = async (req: Request, res: Response) => {
  try {
    let { username } = req.params;
    console.log(username);
    username = req.body.username;
    console.log(username);
    const [result] = await connection.execute(
      `
      SELECT id, building, streetAddress, city, state, wasteDescription, images, accounts.email, firstName, lastName, phoneNumber, creationDate, status
      FROM accounts
      RIGHT JOIN collections
      ON accounts.email = collections.email WHERE username = ?;
      `,
      [username],
    );
    if ((result as RowDataPacket[]).length === 0) {
      res.status(404).send({ result: false, message: 'No results found' });
      return;
    }
    console.log(result);
    res.status(200).send({
      result: true,
      message: result as RowDataPacket[],
    });
  } catch (err) {
    console.log(err);
  }
};

const FindUserCollection = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    id = req.body.id;
    console.log('fwf');
    const [result] = await connection.execute(
      `
      SELECT id, building, streetAddress, city, state, wasteDescription, images, accounts.email, firstName, lastName, phoneNumber, creationDate, status
      FROM accounts
      RIGHT JOIN collections
      ON accounts.email = collections.email WHERE id = ?;
      `,
      [id],
    );

    if ((result as RowDataPacket[]).length === 0) {
      res.status(404).send({ result: false, message: 'No results found' });
      return;
    }
    res.status(200).send({
      result: true,
      message: (result as RowDataPacket[])[0],
    });
  } catch (err) {
    console.log(err);
  }
};

export { CreateCollection, GetAllOfUserCollection, FindUserCollection };
