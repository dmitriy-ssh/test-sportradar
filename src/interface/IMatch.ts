import { ITeam } from "./ITeam";

export interface IMatch {
  readonly id: Symbol;
  readonly homeTeam: ITeam;
  readonly awayTeam: ITeam;
  readonly homeScore: number;
  readonly awayScore: number;
  readonly startTime: Date;

  setScore(homeScore: number, awayScore: number): void;
}
