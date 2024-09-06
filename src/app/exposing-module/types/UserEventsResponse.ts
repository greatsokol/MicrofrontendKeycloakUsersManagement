import {Principal} from "./Principal";
import {Page} from "./Page";
import {UserEvent} from "./UserEvent";
import {PagableResponse} from "./PagableResponse";

export type UsersEventsResponse = PagableResponse & {
  readonly payload: Page & { content: UserEvent[]; };
}
