import {PrincipalInterface} from "./principal.interface";

export interface PagableResponseInterface {
  readonly principal: PrincipalInterface;
  readonly filter: String | null
}
