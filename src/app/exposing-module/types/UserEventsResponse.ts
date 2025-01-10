import {Page} from "./Page";
import {UserEvent} from "./UserEvent";
import {PagableResponse} from "./PagableResponse";
import {ErrorResponse} from "./ErrorResponse";

type PayloadContent = {
  readonly payload: Page & { content: UserEvent[]; };
}
export type UsersEventsResponse = ErrorResponse & PagableResponse & PayloadContent;
