import { validate } from "class-validator";
import { Request, Response } from "express";
import moment = require("moment");
import { getRepository } from "typeorm";
import { Task } from "../entity/task";

export class TaskController {
  static getAll = async (request: Request, response: Response) => {
    const repository = getRepository(Task);
    let getTasksResponse;
    try {
      const tasks: Task[] = await repository.find({
        relations: ["responsible", "status", "priority"],
      });
      if (tasks.length > 0) {
        getTasksResponse = tasks;
        getTasksResponse.map((task) => {
          // deleting ids from response
          delete task.id;
          delete task.responsible.id;
          delete task.status.id;
          delete task.priority.id;

          //formatting dates
          task.dueDate = moment(task.dueDate).format("YYYY-MM-DD");
          task.created_date = moment(task.created_date).format("YYYY-MM-DD");
        });

        response.send(getTasksResponse);
      } else {
        return response.status(404).json({ message: "No tasks found." });
      }
    } catch (e) {
      return response.status(500).json({
        message: "There was an error in the application.",
      });
    }
  };

  static createTask = async (request: Request, response: Response) => {
    const { responsible, createdBy, description, status, priority, dueDate } =
      request.body;
    const repository = getRepository(Task);

    const task = new Task();

    task.createdBy = createdBy;
    task.responsible = responsible;
    task.description = description;
    task.status = status;
    console.log(priority);
    task.priority = priority;
    task.dueDate = new Date(dueDate);

    const errors = await validate(task);

    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    try {
      console.log(task);
      await repository.save(task);
    } catch (e) {
      return response.status(500).json({
        message: "Error creating new task.",
      });
    }

    //If everything is ok
    response.status(201).json({ message: "Task created" });
  };

  static updateTask = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { responsible, dueDate, priority, status } = request.body;
    const repository = getRepository(Task);
    let task: Task;
    try {
      task = await repository.findOneOrFail(id);
    } catch (e) {
      return response.status(404).json({
        message: "Task not found.",
      });
    }
  };
}
export default TaskController;
