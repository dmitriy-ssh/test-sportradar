import { IMatch } from "./IMatch";
import { ITeam } from "./ITeam";

export interface IScoreboard {
  readonly id: Symbol;
  matches: ReadonlyArray<IMatch>;

  startMatch(homeTeam: ITeam, awayTeam: ITeam, startTime: Date): void;
  finishMatch(match: IMatch): void;
}
