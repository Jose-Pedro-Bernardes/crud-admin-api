import { Request, Response } from "express";
import createUserService from "../services/users/createUser.services";
import { TUserRequest } from "../interfaces/users.interfaces";
import listUsersService from "../services/users/listUsers.services";
import getUserService from "../services/users/getUser.services";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: TUserRequest = req.body;
  const newUser = await createUserService(payload);
  return res.status(201).json(newUser);
};

const listUsers = async (req: Request, res: Response): Promise<Response> => {
  const user = res.locals.user;
  const usersList = await listUsersService(user);

  return res.status(200).json(usersList);
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
  const user = res.locals.user;
  const resUser = await getUserService(user);

  return res.status(200).json(resUser);
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
