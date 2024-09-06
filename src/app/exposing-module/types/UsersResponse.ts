import {Principal} from "./Principal";
import {Page} from "./Page";
import {User} from "./User";
import {PagableResponse} from "./PagableResponse";

export type UsersResponse = PagableResponse & {
  readonly payload: Page & { content: User[]; };
}
