import { Request, Response } from "express";
import { User } from "../entities/User";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient();
export class UserController {
  static getAll = async (request: Request, response: Response) => {
    let userListResponse;
    try {
      const users = await prisma.users.findMany({
        select: {
          username: true,
          role: true,
          lastLoginDate: true,
          lastModified: true,
          createdDate: true,
        },
      });
      if (users.length > 0) {
        userListResponse = UserController.parseGetUsersResponse(users);
        response.send(userListResponse);
      } else {
        return response.status(404).json({ message: "No users found." });
      }
    } catch (e) {
      return response.status(500).json({
        message: "There was an error in the application.",
      });
    }
  };

  static getUserById = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
        rejectOnNotFound: true,
      });
      response.send(user);
    } catch (e) {
      return response.status(404).json({ message: "No user found." });
    }
  };

  static createUser = async (request: Request, response: Response) => {
    const { username, password, role, statusId } = request.body;
    let status;
    if (!statusId) {
      try {
        const userStatus = await prisma.userStatus.findFirst({
          where: {
            description: "ACTIVE",
          },
        });
        status = userStatus;
      } catch (e) {
        return response.status(500).json({
          message: e,
        });
      }
    }

    try {
      const user = await prisma.users.create({
        data: {
          username: username,
          password: UserController.hashPassword(password),
          role: role,
          createdDate: new Date(),
          lastModified: new Date(),
          statusId: statusId || status.statusId || "",
        },
      });
    } catch (e) {
      return response.status(409).json({
        message: e,
        errorCode: e.code,
        errorMessage: e.message,
      });
    }

    //If everything is ok
    response.status(201).json({ message: "User created" });
  };

  static modifyUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { username, role } = request.body;
    try {
      const updatedUser = await prisma.users.update({
        where: {
          id: id.toString(),
        },
        data: {
          role: role,
          lastModified: new Date(),
          username: username,
        },
      });
    } catch (e) {
      response.status(500).json({
        message: e,
      });
    }
    response.status(201).json({
      message: "User updated.",
    });
  };

  static deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    let user: User;

    try {
      user = await prisma.users.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      response.status(500).json({
        message: e,
      });
    }
    return response.status(201).json({
      message: "User deleted.",
    });
  };

  static parseGetUsersResponse = (usersList) => {
    usersList.map((user) => {
      console.log(user);
      //formatting dates
      user.lastModified = moment(user.lastModified).format("YYYY-MM-DD");
      user.createdDate = moment(user.createdDate).format("YYYY-MM-DD");
      user.lastLoginDate = moment(user.createdDate).format("YYYY-MM-DD");
    });
    return usersList;
  };

  static hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };
}
export default UserController;
