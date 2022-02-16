import { Request, Response } from "express";
const moment = require("moment");
import { getRepository } from "typeorm";
import { Dashboard } from "../entities/dashboard";
import { DashboardUser } from "../entities/dashboards-users";
import {
  DashboardByUserResponse,
  DashboardInformation,
} from "../responses/dashboard-responses";
export class DashboardUsersController {
  static getDashboardsByUserId = async (
    request: Request,
    response: Response
  ) => {
    const repository = getRepository(DashboardUser);
    const userId = request.params;
    let dashboardByUserResponse: DashboardByUserResponse =
      {} as DashboardByUserResponse;

    try {
      const dashboardsUser: DashboardUser[] = await repository.find({
        relations: ["dashboard"],
        where: {
          user: userId,
        },
      });

      if (dashboardsUser) {
        dashboardByUserResponse.dashboards =
          DashboardUsersController.parseDashboardResponse(dashboardsUser);
        response.send(dashboardByUserResponse);
      } else {
        response.status(404).json({ message: "No boards found for user." });
      }
      response.send(dashboardsUser);
    } catch (e) {
      response.send(e);
    }
  };

  static parseDashboardResponse = (dashboardsUser: DashboardUser[]) => {
    const dashboardInformationArray = [];
    dashboardsUser.map((dashboardUser) => {
      const dashboard: Dashboard = dashboardUser.dashboard;
      const name = dashboard.name;
      const createdDate = moment(dashboard.createdDate).format("YYYY-MM-DD");
      const modifiedDate = moment(dashboard.modifiedDate).format("YYYY-MM-DD");

      const dashboardInformation: DashboardInformation = {
        name,
        createdDate,
        modifiedDate,
      };
      dashboardInformationArray.push(dashboardInformation);
    });
    return dashboardInformationArray;
  };
}
