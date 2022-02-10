import { Request, Response } from "express";
import moment = require("moment");
import { getRepository } from "typeorm";
import { Dashboard } from "../entity/dashboard";
import { DashboardListResponse } from "../responses/dashboard-responses";

class DashboardController {
  static getAll = async (request: Request, response: Response) => {
    const dashboardRepository = getRepository(Dashboard);
    let getDashboardsResponse;
    try {
      const dashboardList: Dashboard[] = await dashboardRepository.find({
        relations: ["owner"],
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
    const dashboardRepository = getRepository(Dashboard);
    try {
      const dashboard: Dashboard = await dashboardRepository.findOne(
        request.params
      );
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

  static parseTaskResponse = (dashboardList: Dashboard[]) => {
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
