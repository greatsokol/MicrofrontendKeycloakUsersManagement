import {DefaultDataLoader} from "./DefaultDataLoader";
import {UserResponse} from "../types/UserResponse";

export class UserLoaderService extends DefaultDataLoader {
  override getData = () => this.data as UserResponse | null;
}
