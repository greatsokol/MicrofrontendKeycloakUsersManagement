import {PageInterface} from "./page.interface";
import {LoginInterface} from "./login.interface";
import {PagableResponseInterface} from "./pagable-response.interface";
import {ErrorResponseInterface} from "./error-response.interface";

interface PayloadContent {
  readonly payload: PageInterface & { content: LoginInterface[]; };
}

export type LoginResponseInterface = ErrorResponseInterface & PagableResponseInterface & PayloadContent;
