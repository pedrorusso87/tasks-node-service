export class DashboardListResponse {
  id: number;
  name: string;
  modifiedDate: string;
  createdDate: string;
  owner: {
    username: string;
    role: string;
  };
}

export class DashboardByUserResponse {
  dashboards: DashboardInformation[];
}

export class DashboardInformation {
  name: string;
  createdDate: string;
  modifiedDate: string;
}
