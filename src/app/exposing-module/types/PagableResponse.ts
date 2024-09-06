import {Principal} from "./Principal";
import {Page} from "./Page";

export type PagableResponse = {
  principal: Principal;
  payload: Page;
  filter: String | null
}
