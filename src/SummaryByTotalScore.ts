import { IMatch, IScoreboard, ISummary } from "./interface";

export class SummaryByTotalScore implements ISummary {
  private getMatchSummary(match: IMatch): string {
    return `${match.homeTeam.name} ${match.homeScore} - ${match.awayTeam.name} ${match.awayScore}`;
  }

  private sortMatches(matches: readonly IMatch[]) {
    return [...matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;

      if (totalScoreA !== totalScoreB) {
        return totalScoreB - totalScoreA;
      }

      return b.startTime.getTime() - a.startTime.getTime();
    });
  }

  getSummary(scoreboard: IScoreboard): string[] {
    return this.sortMatches(scoreboard.matches).map((match) =>
      this.getMatchSummary(match)
    );
  }
}
