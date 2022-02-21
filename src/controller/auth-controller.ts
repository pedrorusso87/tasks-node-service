import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { User } from "../entities/User";
import * as bcrypt from "bcryptjs";
import { UserLoginResponse } from "../responses/login-responses";
import moment from "moment";
const prisma = new PrismaClient();
class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }
    let user: User;

    try {
      user = await prisma.users.findUnique({
        where: {
          username: username,
        },
        include: {
          satus: {
            select: {
              description: true,
            },
          },
        },
      });
      if (!user) {
        return res.status(400).json({
          message: "Username or password are invalid.",
        });
      } else {
        if (AuthController.checkPassword(password, user.password)) {
          res.send(AuthController.parseLoginResponse(user));
        } else {
          return res.status(400).json({
            message: "Username or password are invalid.",
          });
        }
      }
    } catch (e) {
      return res.status(500).json({
        message: "There was an error in the application. " + e,
      });
    }
  };

  static checkPassword = (password, encryptedPassword) => {
    return bcrypt.compareSync(password, encryptedPassword);
  };

  static parseLoginResponse = (user) => {
    let response = {
      username: user.username,
      role: user.role,
      createdDate: moment(user.createdDate).format("DD-MM-YYYY"),
      lastLoginDate: moment(user.lastLoginDate).format("DD-MM-YYYY"),
      status: user.satus.description,
    } as UserLoginResponse;
    return response;
  };
}
export default AuthController;
