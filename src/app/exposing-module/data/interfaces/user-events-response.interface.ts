import {PageInterface} from "./page.interface";
import {UserEventInterface} from "./user-event.interface";
import {PagableResponseInterface} from "./pagable-response.interface";
import {ErrorResponseInterface} from "./error-response.interface";

interface PayloadContent {
  readonly payload: PageInterface & { content: UserEventInterface[]; };
}

export interface UsersEventsResponseInterface extends ErrorResponseInterface, PagableResponseInterface, PayloadContent {
}
