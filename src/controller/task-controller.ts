import { PrismaClient } from "@prisma/client";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { Task } from "../entities/task";
import { GetTasksByDashboardResponse } from "../responses/tasks-responses";
const moment = require("moment");
const prisma = new PrismaClient();
export class TaskController {
  static getAll = async (request: Request, response: Response) => {
    let getTasksResponse;
    try {
      const tasks = await prisma.task.findMany({
        include: {
          responsible: {
            select: {
              username: true,
              role: true,
            },
          },
          status: true,
          priority: true,
          createdBy: {
            select: {
              username: true,
              role: true,
            },
          },
        },
      });
      if (tasks.length > 0) {
        getTasksResponse = TaskController.parseGetTaskResponse(tasks);
        response.send(getTasksResponse);
      } else {
        return response.status(404).json({ message: "No tasks found." });
      }
    } catch (e) {
      return response.status(500).json({
        message: "There was an error in the application. " + e,
      });
    }
  };

  static getTasksByDashboardId = async (
    request: Request,
    response: Response
  ) => {
    const taskId = request.params.toString();

    try {
      const tasks = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });
      console.log(tasks);
      return response
        .status(200)
        .send(TaskController.parseGetByDashboardResponse(tasks));
    } catch (e) {
      return response.status(500).json({
        message: "There was an error in the application. " + e,
      });
    }
  };

  static deleteTask = async (request: Request, response: Response) => {
    const { id } = request.params;
    let task;

    try {
      task = await prisma.task.delete({
        where: {
          id: id.toString(),
        },
        select: {
          id: true,
        },
      });
    } catch (e) {
      if (!task) {
        return response.status(404).json({
          message: "Task not found. " + e,
        });
      }
      return response.status(500).json({
        message: "Could not delete taks. " + e,
      });
    }
    return response.status(200).json({
      message: "Task deleted successfully.",
    });
  };

  static createTask = async (request: Request, response: Response) => {
    const {
      responsibleId,
      createdBy,
      description,
      status,
      priority,
      dueDate,
      dashboardId,
      createdDate,
    } = request.body;

    const task = new Task();

    const errors = await validate(task);
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    try {
      await prisma.task.create({
        data: {
          description: description,
          createdBy: {
            connect: {
              id: createdBy,
            },
          },
          status: {
            connect: {
              id: status,
            },
          },
          priority: {
            connect: {
              id: priority,
            },
          },
          responsible: {
            connect: {
              id: responsibleId,
            },
          },
          dashboard: {
            connect: {
              id: dashboardId,
            },
          },
          createdDate: createdDate,
          dueDate: dueDate,
        },
      });
    } catch (e) {
      return response.status(500).json({
        message: "Error creating new task. " + e,
      });
    }

    //If everything is ok
    response.status(201).json({ message: "Task created" });
  };

  /*static updateTask = async (request: Request, response: Response) => {
   const { id } = request.params;
    const { responsible, dueDate, priority, status, description } =
      request.body;
    const taskRepository = getRepository(Task);
    let task: Task;

    try {
      task = await taskRepository.findOneOrFail(id);
    } catch (e) {
      return response.status(404).json({
        message: "Task not found.",
      });
    }

    //If a new responsible is selected, find it. If is not an existing user, return an error response
    if (responsible) {
      const user = await TaskController.findUserForTaskUpdate(responsible);
      if (user) {
        task.responsible = user.username;
      } else {
        return response.status(404).json({ message: "No valid user selected" });
      }
    }

    task.dueDate = new Date(dueDate) || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.description = description || task.description;

    const errors = await validate(task);
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    try {
      await taskRepository.save(task);
    } catch (e) {
      return response.status(500).json({
        message: "Task update failed. " + e,
      });
    }

    response.status(201).json({
      message: "Task updated.",
    });
  };*/

  static parseGetTaskResponse = (taskList) => {
    taskList.map((task) => {
      //deleting ids from response
      delete task.responsibleId;
      delete task.createdById;
      delete task.statusId;
      delete task.priorityId;
      delete task.dashboardId;

      //deleting ids from objects
      delete task.status.id;
      delete task.priority.id;

      //formatting dates
      task.dueDate = moment(task.dueDate).format("YYYY-MM-DD");
      task.createdDate = moment(task.createdDate).format("YYYY-MM-DD");
    });
    return taskList;
  };

  static parseGetByDashboardResponse = (taskList) => {
    let getTasksResponse = [] as GetTasksByDashboardResponse[];
    taskList.map((task) => {
      let taskResponse = {} as GetTasksByDashboardResponse;
      //formatting dates
      const dueDate = moment(task.dueDate).format("YYYY-MM-DD:HH:mm");
      const createdDate = moment(task.created_date).format("YYYY-MM-DD:HH:mm");
      const description = task.description;
      const id = task.id;
      taskResponse = { id, createdDate, description, dueDate };
      getTasksResponse.push(taskResponse);
    });
    return getTasksResponse;
  };
}
export default TaskController;
