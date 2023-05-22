import { type Request } from "express";
import { type Types } from "mongoose";

export type UserCredentialsRequest = Request<
  Record<string, any>,
  Record<string, any>,
  UserCredentials
>;

export interface UserCredentials {
  username: string;
  password: string;
}
export interface UserStructure {
  _id: string;
  username: string;
  password: string;
}

export interface UserDataStructure extends UserCredentials {
  _id: Types.ObjectId;
  fullName: string;
  age: number;
  interest: string;
  photo: string;
  friends: Types.ObjectId[];
  enemies: Types.ObjectId[];
}
