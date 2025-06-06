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

  /**
   *
   * @throws Error if the same match is already started
   * @throws Error if the teams are the same
   * @throws Error if the teams are already playing in another match
   */
  startMatch(match: IMatch): void {
    if (match.homeTeam.id === match.awayTeam.id) {
      throw new Error("Teams must be different");
    }

    if (this._matches.has(match)) {
      throw new Error("Match already started");
    }

    if (
      this.matches.some((m) => {
        return (
          m.homeTeam.id === match.homeTeam.id ||
          m.awayTeam.id === match.awayTeam.id ||
          m.homeTeam.id === match.awayTeam.id ||
          m.awayTeam.id === match.homeTeam.id
        );
      })
    ) {
      throw new Error("Teams are already playing in another match");
    }

    this._matches.add(match);
  }

  /**
   *
   * @throws Error if the match is not on the scoreboard
   */
  finishMatch(match: IMatch): void {
    if (!this._matches.has(match)) {
      throw new Error("Match not on scoreboard");
    }

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
