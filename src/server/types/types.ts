import { type Request } from "express";
import { type Types } from "mongoose";
import type * as core from "express-serve-static-core";

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

export interface CustomRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
}
