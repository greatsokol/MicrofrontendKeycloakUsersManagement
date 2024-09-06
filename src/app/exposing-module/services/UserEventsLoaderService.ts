import {PagableDataLoader} from "./PagableDataLoader";
import {UsersEventsResponse} from "../types/UserEventsResponse";

export class UserEventsLoaderService extends PagableDataLoader {
  override getData = () => this.data as UsersEventsResponse | null;
}
