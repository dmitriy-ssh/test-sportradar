import { IMatch, ITeam } from "./interface";

export class Match implements IMatch {
  readonly id: Symbol;

  readonly homeTeam: ITeam;

  readonly awayTeam: ITeam;

  private _homeScore: number;

  public get homeScore(): number {
    return this._homeScore;
  }

  private _awayScore: number;

  public get awayScore(): number {
    return this._awayScore;
  }

  readonly startTime: Date;

  public setScore(homeScore: number, awayScore: number): void {
    return;
  }

  constructor(
    homeTeam: ITeam,
    awayTeam: ITeam,
    homeScore: number,
    awayScore: number,
    startTime: Date
  ) {
    this.id = Symbol();
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this._homeScore = homeScore;
    this._awayScore = awayScore;
    this.startTime = startTime;
  }
}
