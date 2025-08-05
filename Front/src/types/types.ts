import type { AxiosResponse } from "axios";
import type { LatLngExpression } from "leaflet";

export type ProfileInput = {
  field: "username" | "email" | "password" | null;
};

export type IRequest = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  building: string;
  streetAddress: string;
  city: string;
  state: string;
  wasteDescription: string;
  images: Array<string>;
  creationDate: string;
  status: string;
  agentInCharge: string;
};

export type ILocation = {
  office: string;
  approx_coordinates: LatLngExpression;
  city: string;
};

export type IData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  building: string;
  streetAddress: string;
  city: string;
  state: string;
  wasteDescription: string;
  images: Array<string>;
};

export interface axiosResponse extends AxiosResponse {
  data: {
    status: string;
    data: { [key: string]: string | number };
    message: string;
    code: number;
  };
}
