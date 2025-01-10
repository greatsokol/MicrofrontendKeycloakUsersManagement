import {Page} from "./Page";
import {Login} from "./Login";
import {PagableResponse} from "./PagableResponse";
import {ErrorResponse} from "./ErrorResponse";

type PayloadContent = {
  readonly payload: Page & { content: Login[]; };
};
export type LoginResponse = ErrorResponse & PagableResponse & PayloadContent;
