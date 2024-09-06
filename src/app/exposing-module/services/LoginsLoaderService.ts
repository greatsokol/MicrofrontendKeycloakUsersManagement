import {PagableDataLoader} from "./PagableDataLoader";
import {LoginResponse} from "../types/LoginResponse";

export class LoginsLoaderService extends PagableDataLoader {
  override getData = () => this.data as LoginResponse | null;
}
