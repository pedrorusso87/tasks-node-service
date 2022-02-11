import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Priority } from "../entity/priority";

export class PriorityController {
  static getAll = async (request: Request, response: Response) => {
    const prioritiesRepository = getRepository(Priority);

    try {
      const priorities = await prioritiesRepository.find();
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

  static modifyPriority = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { description } = request.body;
    const prioritiesRepository = getRepository(Priority);
    let priority: Priority;

    try {
      priority = await prioritiesRepository.findOneOrFail(id);
    } catch (e) {
      return response.status(404).json({
        message: "Priority not found.",
      });
    }

    priority.description = description;

    const errors = await validate(priority);
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    //Save updated priority
    try {
      await prioritiesRepository.save(priority);
    } catch (e) {
      return response.status(409).json({
        message: "priority already exists.",
      });
    }

    response.status(201).json({
      message: "Priority updated.",
    });
  };
}

export default PriorityController;
