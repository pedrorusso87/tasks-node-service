import { PrismaClient } from "@prisma/client";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { Status } from "../entities/status";
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

  /*static modifyStatus = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { description } = request.body;
    const statusRepository = getRepository(Status);
    let status: Status;

    try {
      status = await statusRepository.findOneOrFail(id);
    } catch (e) {
      return response.status(404).json({
        message: "Status not found.",
      });
    }

    status.description = description;

    const errors = await validate(status);
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    //Save updated priority
    try {
      await statusRepository.save(status);
    } catch (e) {
      return response.status(409).json({
        message: "Status already exists.",
      });
    }

    response.status(201).json({
      message: "Status updated.",
    });
  };

  static addStatus = async (request: Request, response: Response) => {
    const statusRepository = getRepository(Status);
    const { description } = request.body;

    const status = new Status();
    status.description = description;

    const errors = await validate(status);
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    try {
      await statusRepository.save(status);
    } catch (e) {
      return response.status(500).json({
        message: "Error creating new status. " + e,
      });
    }

    response.status(201).json({ message: "Status created" });
  };*/
}

export default StatusController;
