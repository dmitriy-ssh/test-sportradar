import { SummaryByTotalScore } from "../src";
import { IMatch, IScoreboard } from "../src/interface";

function createMockScoreboard(matches: IMatch[]): IScoreboard {
  return {
    id: Symbol(),
    matches: matches,
    startMatch: jest.fn(),
    finishMatch: jest.fn(),
  };
}

function createMockMatch(
  homeName: string,
  awayName: string,
  homeScore: number,
  awayScore: number,
  date: Date
): IMatch {
  return {
    id: Symbol(),
    homeTeam: { id: Symbol(), name: homeName },
    awayTeam: { id: Symbol(), name: awayName },
    homeScore: homeScore,
    awayScore: awayScore,
    startTime: date,
    setScore: jest.fn(),
  };
}

describe("SummaryByTotalScore", () => {
  it("should return an empty summary for no matches", () => {
    const matches: IMatch[] = [];
    const scoreboard = createMockScoreboard(matches);

    const summary = new SummaryByTotalScore().getSummary(scoreboard);

    expect(summary.length).toBe(0);
  });

  it("should return correct summary for matches by total score with same datetime", () => {
    const date = new Date("2025-01-01T12:00:00Z");
    const matches: IMatch[] = [
      createMockMatch("Team A", "Team B", 2, 4, date),
      createMockMatch("Team C", "Team D", 1, 1, date),
      createMockMatch("Team E", "Team F", 1, 4, date),
    ];
    const scoreboard = createMockScoreboard(matches);

    const summary = new SummaryByTotalScore().getSummary(scoreboard);

    expect(summary).toStrictEqual([
      "Team A 2 - Team B 4",
      "Team E 1 - Team F 4",
      "Team C 1 - Team D 1",
    ]);
  });

  it("should return correct summary for matches by total score with different datetime", () => {
    const matches: IMatch[] = [
      createMockMatch(
        "Team A",
        "Team B",
        2,
        4,
        new Date("2025-01-01T12:00:00Z")
      ),
      createMockMatch(
        "Team C",
        "Team D",
        1,
        1,
        new Date("2025-01-02T12:00:00Z")
      ),
      createMockMatch(
        "Team E",
        "Team F",
        1,
        1,
        new Date("2025-01-01T12:00:00Z")
      ),
      createMockMatch(
        "Team G",
        "Team H",
        1,
        1,
        new Date("2025-01-03T12:00:00Z")
      ),
      createMockMatch(
        "Team I",
        "Team J",
        6,
        6,
        new Date("2024-12-12T12:00:00Z")
      ),
    ];
    const scoreboard = createMockScoreboard(matches);

    const summary = new SummaryByTotalScore().getSummary(scoreboard);

    expect(summary).toStrictEqual([
      "Team I 6 - Team J 6",
      "Team A 2 - Team B 4",
      "Team G 1 - Team H 1",
      "Team C 1 - Team D 1",
      "Team E 1 - Team F 1",
    ]);
  });
});
