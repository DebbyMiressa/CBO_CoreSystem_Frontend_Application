export interface UserP {
  password: string,
  createdAt: string;
  active: boolean;
  username : string,
  employee: {
      id: number,
  },
  roles: [{
    id: number,
  }],
  role: number;
  branch: {
    id: number,
  },
}
