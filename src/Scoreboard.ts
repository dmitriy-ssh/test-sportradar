import { IMatch, IScoreboard, ITeam } from "./interface";

export class Scoreboard implements IScoreboard {
  readonly id: Symbol;
  private _matches: IMatch[];

  public get matches(): ReadonlyArray<IMatch> {
    return this._matches;
  }

  startMatch(match: IMatch): void {
    return;
  }
  finishMatch(match: IMatch): void {
    return;
  }

  constructor() {
    this.id = Symbol();
    this._matches = [];
  }
}
