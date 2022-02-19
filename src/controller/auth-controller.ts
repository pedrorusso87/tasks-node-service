import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { User } from "../entities/User";
import * as bcrypt from "bcryptjs";
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
      });
      if (!user) {
        return res.status(400).json({
          message: "Username or password are invalid.",
        });
      } else {
        if (AuthController.checkPassword(password, user.password)) {
          res.send(user);
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
}
export default AuthController;
