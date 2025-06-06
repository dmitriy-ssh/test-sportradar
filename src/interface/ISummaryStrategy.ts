import { IScoreboard } from "./IScoreboard";
import { Summary } from "./Summary";

export interface ISummaryStarategy {
  getSummary(scoreboard: IScoreboard): Summary;
}
