import { IMatch, IScoreboard, ITeam } from "./interface";

export class Scoreboard implements IScoreboard {
  readonly id: Symbol;
  private _matches: Set<IMatch>;

  public get matches(): ReadonlyArray<IMatch> {
    return Array.from(this._matches);
  }

  startMatch(match: IMatch): void {
    this._matches.add(match);
  }

  finishMatch(match: IMatch): void {
    this._matches.delete(match);
  }

  constructor() {
    this.id = Symbol();
    this._matches = new Set<IMatch>();
  }
}
