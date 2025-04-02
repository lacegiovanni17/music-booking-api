import { IUser } from "../users/user.interface"


export interface ILoginUserResponse {
  user: IUser | null;
  token: string | null;
  expiresIn: string | null;
}
