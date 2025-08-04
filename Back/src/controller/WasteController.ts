import { Request, Response } from 'express';
import { cloudinaryConfig, connection } from '../server';
import {
  FieldPacket,
  QueryResult,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { jwt_secret, JWTPayload, VerifyToken } from './AuthController';
import jwt from 'jsonwebtoken';
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
      res.status(400).send({
        status: 'Error',
        data: {},
        message: 'At least  one image is required',
      });
      return;
    }
    const isInputsEmpty =
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phoneNumber === '' ||
      building === '' ||
      streetAddress === '' ||
      city === '' ||
      state === '' ||
      wasteDescription === '';
    if (isInputsEmpty) {
      res.status(400).send({
        status: 'Error',
        data: {},
        message: 'One or more input is empty',
      });
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
    console.log(result);
    res
      .status(201)
      .send({ status: 'Success', data: {}, message: 'Request created' });
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
      .send({ status: 'Error', data: {}, message: 'Failed to create request' });
  }
};

const GetAllOfUserCollection = async (req: Request, res: Response) => {
  try {
    let { username } = req.params;
    username = req.body.username;
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
      res
        .status(404)
        .send({ status: 'Error', data: {}, message: 'No results found' });
      return;
    }
    res.status(200).send({
      status: 'Success',
      data: result as RowDataPacket[],
      message: 'Succesfully found result(s)',
    });
  } catch (err) {
    console.log(err);
  }
};

const FindUserCollection = async (req: Request, res: Response) => {
  try {
    let { id } = req.params ?? req.body;
    const [result] = await connection.execute(
      `
      SELECT id, building, streetAddress, city, state, wasteDescription, images, accounts.email, firstName, lastName, phoneNumber, creationDate, status, agentInCharge
      FROM accounts
      RIGHT JOIN collections
      ON accounts.email = collections.email WHERE id = ?;
      `,
      [id],
    );

    if ((result as RowDataPacket[]).length === 0) {
      res
        .status(404)
        .send({ status: 'Error', data: {}, message: 'No results found' });
      return;
    }
    res.status(200).send({
      status: 'Success',
      data: (result as RowDataPacket[])[0],
      message: 'Succesfully found result(s)',
    });
  } catch (err) {
    console.log(err);
  }
};

const UpdateUserCollection = async (req: Request, res: Response) => {
  try {
    let { id, action, agentInCharge } = req.body;
    let token: string | JWTPayload | boolean = req.cookies.auth;
    let result: [QueryResult, FieldPacket[]];

    if (token) {
      // Verify token to match collection id to logged in user
      token = VerifyToken(token as string);

      if (!token) {
        res
          .status(401)
          .send({ status: 'Error', data: {}, message: 'Invalid token' });
        return;
      }
      token = jwt.decode(token) as JWTPayload;

      switch (action) {
        case 'cancel':
          result = await CancelCollection(id, token.email);
          break;
        case 'mark':
          result = await MarkCollection(id, token.email);
          break;
        case 'assign':
          result = await AssignAgentToCollection(
            id,
            token.email,
            agentInCharge,
          );
          break;
        default:
          break;
      }

      const isRowAffected = (result![0] as ResultSetHeader).affectedRows > 0;
      if (isRowAffected) {
        res.status(200).send({
          status: 'Success',
          data: (result![0] as ResultSetHeader).affectedRows,
          message: 'Successfully updated collection info',
        });
      } else {
        res
          .status(400)
          .send({ status: 'Error', data: {}, message: 'No rows affected' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'Fail',
      data: {},
      message: 'Failed to update collection',
    });
  }
};

const CancelCollection = async (id: string, httpOnlyEmail: string) => {
  const data = await connection.execute(
    `
      UPDATE collections
      SET status = 'cancelled'
      WHERE id = ? AND email = ?;
      `,
    [id, httpOnlyEmail],
  );
  return data;
};

const MarkCollection = async (id: string, httpOnlyEmail: string) => {
  const data = await connection.execute(
    `
      UPDATE collections
      SET status = 'pending_pickup',
      WHERE id = ? AND email = ?;
      `,
    [id, httpOnlyEmail],
  );
  return data;
};

const AssignAgentToCollection = async (
  id: string,
  httpOnlyEmail: string,
  agentInCharge: string,
) => {
  const data = await connection.execute(
    `
      UPDATE collections
      SET status = 'assigned', agentInCharge = ?
      WHERE id = ? AND email = ?;
      `,
    [agentInCharge, id, httpOnlyEmail],
  );
  return data;
};

export {
  CreateCollection,
  GetAllOfUserCollection,
  FindUserCollection,
  UpdateUserCollection,
};
