import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const moment = require("moment");
import { DashboardListResponse } from "../responses/dashboard-responses";
const prisma = new PrismaClient();
class DashboardController {
  static getAll = async (request: Request, response: Response) => {
    let getDashboardsResponse;
    try {
      const dashboardList = await prisma.dashboard.findMany({
        include: {
          owner: {
            select: {
              username: true,
            },
          },
        },
      });
      if (dashboardList.length > 0) {
        getDashboardsResponse =
          DashboardController.parseTaskResponse(dashboardList);
        response.send(getDashboardsResponse);
      } else {
        return response.status(404).json({ message: "No dashboards found." });
      }
    } catch (e) {
      return response.status(500).json({
        message: "There was an error in the application. " + e,
      });
    }
  };

  static getDashboardById = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      const dashboard = await prisma.dashboard.findUnique({
        where: { id: id },
        include: {
          owner: {
            select: {
              username: true,
              createdDate: true,
            },
          },
        },
      });
      if (dashboard) {
        response.send(dashboard);
      } else {
        response.status(404).json({ message: "No dashboards found" });
      }
    } catch (e) {
      return response.status(500).json({
        message: "There was an error in the application. " + e,
      });
    }
  };

  static parseTaskResponse = (dashboardList) => {
    let dashboardListResponse = [] as DashboardListResponse[];
    dashboardList.map((dashboard) => {
      let dashboardResponse = {} as DashboardListResponse;
      // deleting ids from response
      delete dashboard.owner.id;

      //formatting dates
      const createdDate = moment(dashboard.createdDate).format("YYYY-MM-DD");
      const modifiedDate = moment(dashboard.modifiedDate).format("YYYY-MM-DD");

      dashboardResponse.id = dashboard.id;
      dashboardResponse.name = dashboard.name;
      dashboardResponse.modifiedDate = modifiedDate;
      dashboardResponse.createdDate = createdDate;
      dashboardResponse.owner = dashboard.owner;

      dashboardListResponse.push(dashboardResponse);
    });
    return dashboardListResponse;
  };
}
export default DashboardController;
