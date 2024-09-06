import {DefaultDataLoader} from "./DefaultDataLoader";
import {PagableResponse} from "../types/PagableResponse";

export class PagableDataLoader extends DefaultDataLoader {
  override getData = () => this.data as PagableResponse | null;
}
