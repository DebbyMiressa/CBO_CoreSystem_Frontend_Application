export interface UserP {
  username : string,
  password: string,
  createdAt: string;
  active: boolean;
  employee: {
      id: number,
  },
  roles: [{
    id: number,
  }],
  branch: {
    id: number,
  },
}
