import {Page} from "./Page";
import {User} from "./User";
import {PagableResponse} from "./PagableResponse";
import {ErrorResponse} from "./ErrorResponse";

type PayloadContent = {
  readonly payload: Page & { readonly content: User[]; };
};

export type UsersResponse = ErrorResponse & PagableResponse & PayloadContent;
