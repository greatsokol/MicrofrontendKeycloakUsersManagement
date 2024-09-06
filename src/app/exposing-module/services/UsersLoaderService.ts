import {PagableDataLoader} from "./PagableDataLoader";
import {UsersResponse} from "../types/UsersResponse";

export class UsersLoaderService extends PagableDataLoader {
  override getData = () => this.data as UsersResponse | null;
}
