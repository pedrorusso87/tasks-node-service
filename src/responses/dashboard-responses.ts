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
