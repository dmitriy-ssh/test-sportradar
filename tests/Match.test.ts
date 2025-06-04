import { ITeam } from "../src/interface";
import { Match } from "../src/Match";

describe("Match", () => {
  it("should correctly initialize a match", () => {
    const homeTeam: ITeam = { id: Symbol(), name: "Home Team" };
    const awayTeam: ITeam = { id: Symbol(), name: "Away Team" };
    const startDate = new Date("2025-01-01T12:00:00Z");
    const match = new Match(homeTeam, awayTeam, 0, 0, startDate);

    expect(match.homeTeam).toEqual(homeTeam);
    expect(match.awayTeam).toEqual(awayTeam);
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
    expect(match.startTime).toEqual(startDate);
    expect(match.id).toBeDefined();
  });

  it("should set scores correctly", () => {
    const homeTeam: ITeam = { id: Symbol(), name: "Home Team" };
    const awayTeam: ITeam = { id: Symbol(), name: "Away Team" };
    const match = new Match(homeTeam, awayTeam, 0, 0, new Date());

    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);

    match.setScore(2, 3);
    expect(match.homeScore).toBe(2);
    expect(match.awayScore).toBe(3);
  });

  it("should set scores as absolute numbers", () => {
    const homeTeam: ITeam = { id: Symbol(), name: "Home Team" };
    const awayTeam: ITeam = { id: Symbol(), name: "Away Team" };
    const match = new Match(homeTeam, awayTeam, 0, 0, new Date());

    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);

    match.setScore(-3, -4);
    expect(match.homeScore).toBe(3);
    expect(match.awayScore).toBe(4);
  });
});
