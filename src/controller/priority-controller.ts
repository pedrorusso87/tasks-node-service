import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
export class PriorityController {
  static getAll = async (request: Request, response: Response) => {
    try {
      const priorities = await prisma.priority.findMany();
      if (priorities.length > 0) {
        response.send(priorities);
      } else {
        return response.status(404).json({ message: "No priorities found." });
      }
    } catch (e) {
      return response.status(500).json({
        message: "There was an error in the application. " + e,
      });
    }
  };
}

export default PriorityController;
