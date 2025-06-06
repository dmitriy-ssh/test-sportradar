import {
  IMatch,
  IScoreboard,
  ISummaryStarategy,
  ITeam,
  Summary,
} from "./interface";

export class Scoreboard implements IScoreboard {
  readonly id: Symbol;
  readonly defaultSummaryStrategy: ISummaryStarategy | null = null;
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

  constructor(summaryStrategy: ISummaryStarategy | null = null) {
    this.id = Symbol();
    this._matches = new Set<IMatch>();
    this.defaultSummaryStrategy = summaryStrategy;
  }

  getDefaultSummary(): Summary {
    return this?.defaultSummaryStrategy?.getSummary(this) || [];
  }
}
