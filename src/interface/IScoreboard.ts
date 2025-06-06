import { IMatch } from "./IMatch";
import { ITeam } from "./ITeam";
import { Summary } from "./Summary";

export interface IScoreboard {
  readonly id: Symbol;
  matches: ReadonlyArray<IMatch>;

  startMatch(match: IMatch): void;
  finishMatch(match: IMatch): void;

  getDefaultSummary(): Summary;
}
