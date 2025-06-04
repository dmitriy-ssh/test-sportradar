import { Team } from "../src";

describe("Team", () => {
  it("should correctly initialize a team", () => {
    const teamName = "Test Team";
    const team = new Team(teamName);

    expect(team.name).toBe(teamName);
    expect(team.id).toBeDefined();
  });
});
