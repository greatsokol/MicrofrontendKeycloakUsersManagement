import {PageInterface} from "./page.interface";
import {UserInterface} from "./user.interface";
import {PagableResponseInterface} from "./pagable-response.interface";
import {ErrorResponseInterface} from "./error-response.interface";

interface PayloadContent {
  readonly payload: PageInterface & { readonly content: UserInterface[]; };
}

export interface UsersResponseInterface extends ErrorResponseInterface, PagableResponseInterface, PayloadContent {
}
