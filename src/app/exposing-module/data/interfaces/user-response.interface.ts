import {PrincipalInterface} from "./principal.interface";
import {UserInterface} from "./user.interface";
import {ErrorResponseInterface} from "./error-response.interface";

interface PayloadContent {
  readonly principal: PrincipalInterface;
  readonly payload: UserInterface;
}

export interface UserResponseInterface extends ErrorResponseInterface, PayloadContent {
}
