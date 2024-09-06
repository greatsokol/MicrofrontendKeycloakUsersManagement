import {Principal} from "./Principal";
import {Page} from "./Page";
import {Login} from "./Login";
import {PagableResponse} from "./PagableResponse";

export type LoginResponse = PagableResponse & {
  readonly payload: Page & { content: Login[]; };
}
