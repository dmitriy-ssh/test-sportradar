import { IScoreboard, ISummary } from "./interface";

export class SummaryByTotalScore implements ISummary {
  getSummary(scoreboard: IScoreboard): string[] {
    return [];
  }
}
