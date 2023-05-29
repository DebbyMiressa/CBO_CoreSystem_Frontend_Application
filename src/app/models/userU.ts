export interface UserU {
  id: number,
  password: string,
  username : string,
  createdAt: string,
  active: boolean,
  employee: {
    id: number,
  },
  roles: {
    id: number,
  },
  branch: {
    id: number,
  }
}
