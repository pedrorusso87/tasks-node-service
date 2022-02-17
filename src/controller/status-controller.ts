import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
export class StatusController {
  static getAll = async (request: Request, response: Response) => {
    try {
      const statuses = await prisma.status.findMany();
      if (statuses.length > 0) {
        response.send(statuses);
      } else {
        return response.status(404).json({ message: "No statuses found." });
      }
    } catch (e) {
      console.log(response);
      return response.status(500).json({
        message: "There was an error in the application.",
      });
    }
  };
}

export default StatusController;
