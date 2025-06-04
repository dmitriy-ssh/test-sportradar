import { IMatch } from "./IMatch";
import { ITeam } from "./ITeam";

export interface IScoreboard {
  readonly id: Symbol;
  matches: ReadonlyArray<IMatch>;

  startMatch(match: IMatch): void;
  finishMatch(match: IMatch): void;
}
