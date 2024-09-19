import { User } from "../../models/user.model";

export interface loadUser {
  total: number;
  users: User[];
}
