import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const moment = require("moment");
import {
  DashboardByUserResponse,
  DashboardInformation,
} from "../responses/dashboard-responses";
const prisma = new PrismaClient();
export class DashboardUsersController {
  static getDashboardsByUsername = async (req: Request, res: Response) => {
    const username = req.params.username;
    let userId;
    let dashboardByUserResponse: DashboardByUserResponse =
      {} as DashboardByUserResponse;
    try {
      const user = await prisma.users.findUnique({
        where: {
          username: username
        }
      })
      userId = user.id;
    } catch(e) {
      return res.status(500).json({
        message: e
      })
    }
    try {
      console.log(userId)
      const dashboardsUser = await prisma.dashboardUser.findMany({
        where: {
          userId: userId,
        },
        include: {
          dashboard: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              username: true,
            },
          },
        },
      });
      if (dashboardsUser.length > 0) {
        dashboardByUserResponse.dashboards =
          DashboardUsersController.parseDashboardResponse(dashboardsUser);
        res.send(dashboardByUserResponse);
      } else {
        res.status(404).json({ message: "No boards found for user." });
      }
    } catch (e) {
      return res.status(500).json({
        message: "There was an error in the application. " + e,
      });
    }
  };

  static parseDashboardResponse = (dashboardsUser) => {
    const dashboardInformationArray = [];
    dashboardsUser.map((dashboardUser) => {
      const name = dashboardUser.dashboard.name;
      const username = dashboardUser.user.username;
      const createdDate = moment(dashboardUser.dashboard.createdDate).format(
        "YYYY-MM-DD"
      );
      const modifiedDate = moment(dashboardUser.dashboard.modifiedDate).format(
        "YYYY-MM-DD"
      );

      const dashboardInformation: DashboardInformation = {
        name,
        createdDate,
        modifiedDate,
        owner: {
          username: username,
          role: "",
        },
      };
      dashboardInformationArray.push(dashboardInformation);
    });
    return dashboardInformationArray;
  };
}
