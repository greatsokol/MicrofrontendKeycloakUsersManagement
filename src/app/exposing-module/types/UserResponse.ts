import {Principal} from "./Principal";
import {User} from "./User";
import {ErrorResponse} from "./ErrorResponse";

type PayloadContent = {
  readonly principal: Principal;
  readonly payload: User;
};

export type UserResponse = ErrorResponse & PayloadContent;
