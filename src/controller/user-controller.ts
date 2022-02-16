import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();
export class UserController {
  static getAll = async (request: Request, response: Response) => {
    let userListResponse;
    try {
      const users = await prisma.users.findMany();
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
    const { username, password, role } = request.body;

    try {
      const user = await prisma.users.create({
        data: {
          username: username,
          password: password,
          role: role,
          createdDate: new Date(),
          lastModified: new Date(),
        },
      });
    } catch (e) {
      return response.status(409).json({
        message: "Username already exists." + e,
      });
    }

    //If everything is ok
    response.status(201).json({ message: "User created" });
  };

  static modifyUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { username, role } = request.body;
    let user: User;

    response.status(201).json({
      message: "User updated.",
    });
  };

  static deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    let user: User;

    return response.status(201).json({
      message: "User deleted.",
    });
  };

  static parseGetUsersResponse = (usersList) => {
    usersList.map((user) => {
      //formatting dates
      user.lastModified = moment(user.lastModified).format("YYYY-MM-DD");
      user.createdDate = moment(user.createdDate).format("YYYY-MM-DD");
    });
    return usersList;
  };
}
export default UserController;
