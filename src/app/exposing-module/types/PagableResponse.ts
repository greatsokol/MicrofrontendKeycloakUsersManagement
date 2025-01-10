import {Principal} from "./Principal";
import {Page} from "./Page";

export type PagableResponse = {
  readonly principal: Principal;
  readonly payload: Page;
  readonly filter: String | null
}
