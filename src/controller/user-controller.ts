import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { validate } from "class-validator";

export class UserController {
  static getAll = async (request: Request, response: Response) => {
    const userRepository = getRepository(User);

    try {
      const users = await userRepository.find();
      if (users.length > 0) {
        response.send(users);
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
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail(id);
      response.send(user);
    } catch (e) {
      return response.status(404).json({ message: "No user found." });
    }
  };

  static createUser = async (request: Request, response: Response) => {
    const { username, password, role } = request.body;
    const userRepository = getRepository(User);

    const user = new User();

    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user);

    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    try {
      await userRepository.save(user);
    } catch (e) {
      return response.status(409).json({
        message: "Username already exists.",
      });
    }

    //If everything is ok
    response.status(201).json({ message: "User created" });
  };

  static modifyUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { username, role } = request.body;
    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (e) {
      return response.status(404).json({
        message: "User not found.",
      });
    }

    user.username = username;
    user.role = role;

    const errors = await validate(user);
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    //Save updated user
    try {
      await userRepository.save(user);
    } catch (e) {
      return response.status(409).json({
        message: "username already exists.",
      });
    }

    response.status(201).json({
      message: "User updated.",
    });
  };

  static deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const userRepository = getRepository(User);
    let user: User;

    try {
      await userRepository.findOneOrFail(id);
    } catch (e) {
      return response.status(404).json({
        message: "User not found.",
      });
    }
    await userRepository.delete(id);
    return response.status(201).json({
      message: "User deleted.",
    });
  };
}
export default UserController;
