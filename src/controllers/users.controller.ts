import { Request, Response } from "express";
import createUserService from "../services/users/createUser.services";
import { TUserRequest } from "../interfaces/users.interfaces";
import listUsersService from "../services/users/listUsers.services";
import getUserService from "../services/users/getUser.services";
import updateUserService from "../services/users/updateUser.services";
import deleteUserService from "../services/users/deleteUser.services";
import { usersUpdateSchema } from "../schemas/schemas";
import userRecoverService from "../services/users/recoverUser.services";

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
  const payload = usersUpdateSchema.parse(req.body);
  const { user } = res.locals;
  const { id, admin: isAdmin } = res.locals.userExists;

  const userRes = await updateUserService(payload, user, id, isAdmin);
  return res.status(200).json(userRes);
};

const softDeleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { user } = res.locals;
  const { admin: isAdmin } = res.locals.userExists;

  await deleteUserService(id, user, isAdmin);
  return res.status(204).json();
};

const userRecover = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const userRecovered = await userRecoverService(id);

  return res.status(200).json(userRecovered);
};

export {
  createUser,
  listUsers,
  getUser,
  updateUser,
  softDeleteUser,
  userRecover,
};
