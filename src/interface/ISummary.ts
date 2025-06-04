import { IScoreboard } from "./IScoreboard";

export interface ISummary {
  getSummary(scoreboard: IScoreboard): string[];
}
