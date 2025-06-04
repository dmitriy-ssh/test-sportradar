import { Scoreboard } from "../src";
import { IMatch, ITeam } from "../src/interface";

describe("Scoreboard", () => {
  it("should correctly initialize a scoreboard", () => {
    const scoreboard = new Scoreboard();

    expect(scoreboard.matches).toEqual([]);
    expect(scoreboard.id).toBeDefined();
  });

  it("should corretly start a match", () => {
    const scoreboard = new Scoreboard();

    const match: IMatch = {
      id: Symbol(),
      homeTeam: { id: Symbol(), name: "Home Team" },
      awayTeam: { id: Symbol(), name: "Away Team" },
      homeScore: 1,
      awayScore: 4,
      startTime: new Date(),
      setScore: jest.fn(),
    };

    scoreboard.startMatch(match);

    expect(scoreboard.matches.length).toBe(1);
    expect(scoreboard.matches[0].homeTeam).toEqual(match.homeTeam);
    expect(scoreboard.matches[0].awayTeam).toEqual(match.awayTeam);
    expect(scoreboard.matches[0].startTime).toEqual(match.startTime);
    expect(scoreboard.matches[0].homeScore).toBe(1);
    expect(scoreboard.matches[0].awayScore).toBe(4);
  });

  it("should not start a match multiple times", () => {
    const scoreboard = new Scoreboard();

    const match: IMatch = {
      id: Symbol(),
      homeTeam: { id: Symbol(), name: "Home Team" },
      awayTeam: { id: Symbol(), name: "Away Team" },
      homeScore: 1,
      awayScore: 4,
      startTime: new Date(),
      setScore: jest.fn(),
    };

    scoreboard.startMatch(match);
    scoreboard.startMatch(match);

    expect(scoreboard.matches.length).toBe(1);
  });

  it("should correctly finish a match", () => {
    const scoreboard = new Scoreboard();

    const match: IMatch = {
      id: Symbol(),
      homeTeam: { id: Symbol(), name: "Home Team" },
      awayTeam: { id: Symbol(), name: "Away Team" },
      homeScore: 2,
      awayScore: 3,
      startTime: new Date(),
      setScore: () => {},
    };

    scoreboard.startMatch(match);
    scoreboard.finishMatch(match);

    expect(scoreboard.matches.length).toBe(0);
  });

  it("should not finish match not on scoreboard", () => {
    const scoreboard = new Scoreboard();

    const match: IMatch = {
      id: Symbol(),
      homeTeam: { id: Symbol(), name: "Home Team" },
      awayTeam: { id: Symbol(), name: "Away Team" },
      homeScore: 2,
      awayScore: 3,
      startTime: new Date(),
      setScore: jest.fn(),
    };

    scoreboard.startMatch(match);

    const match2: IMatch = {
      id: Symbol(),
      homeTeam: { id: Symbol(), name: "Home Team" },
      awayTeam: { id: Symbol(), name: "Away Team" },
      homeScore: 3,
      awayScore: 5,
      startTime: new Date(),
      setScore: jest.fn(),
    };

    scoreboard.finishMatch(match2);

    expect(scoreboard.matches.length).toBe(1);
  });
});
