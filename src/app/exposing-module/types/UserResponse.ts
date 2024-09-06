import {Principal} from "./Principal";
import {User} from "./User";

export type UserResponse = {
  readonly principal: Principal;
  readonly payload: User;
}
