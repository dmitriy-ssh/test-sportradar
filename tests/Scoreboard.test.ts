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

    expect(() => scoreboard.startMatch(match)).toThrow("Match already started");
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

    expect(() => scoreboard.finishMatch(match2)).toThrow(
      "Match not on scoreboard"
    );
  });

  it("should use summary strategy if provided", () => {
    const mockSummaryStrategy = {
      getSummary: jest.fn().mockReturnValue(["mock"]),
    };
    const scoreboard = new Scoreboard(mockSummaryStrategy);

    const summary = scoreboard.getDefaultSummary();

    expect(summary).toEqual(["mock"]);
    expect(mockSummaryStrategy.getSummary).toHaveBeenCalledWith(scoreboard);
  });

  it("should throw an error if teams are the same in a match", () => {
    const scoreboard = new Scoreboard();
    const team: ITeam = { id: Symbol(), name: "Same Team" };
    const match: IMatch = {
      id: Symbol(),
      homeTeam: team,
      awayTeam: team,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(),
      setScore: jest.fn(),
    };
    expect(() => scoreboard.startMatch(match)).toThrow(
      "Teams must be different"
    );
  });
  it("should throw an error if teams are already playing in another match", () => {
    const scoreboard = new Scoreboard();

    const team1: ITeam = { id: Symbol(), name: "Team 1" };
    const team2: ITeam = { id: Symbol(), name: "Team 2" };
    const team3: ITeam = { id: Symbol(), name: "Team 3" };

    const match1: IMatch = {
      id: Symbol(),
      homeTeam: team1,
      awayTeam: team2,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(),
      setScore: jest.fn(),
    };

    const match2: IMatch = {
      id: Symbol(),
      homeTeam: team2,
      awayTeam: team3,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(),
      setScore: jest.fn(),
    };

    scoreboard.startMatch(match1);

    expect(() => scoreboard.startMatch(match2)).toThrow(
      "Teams are already playing in another match"
    );
  });
});
