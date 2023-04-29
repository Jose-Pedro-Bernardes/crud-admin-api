import { Request, Response } from "express";
import createUserService from "../services/users/createUser.services";
import { TUserRequest } from "../interfaces/users.interfaces";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: TUserRequest = req.body;
  const newUser = await createUserService(payload);
  return res.status(201).json(newUser);
};

const listUsers = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const softDeleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(204).json();
};

const userRecover = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

export {
  createUser,
  listUsers,
  getUser,
  updateUser,
  softDeleteUser,
  userRecover,
};
