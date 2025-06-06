## Description

This is a test task, organized as a library. It can be published as
npm package. The project must be built into Javascript using npm run build command before publishing.

## Commands

Run jest tests

```
npm test
```

Build into Javascript before publishing

```
npm run build
```

As it is a library there is no run command.

## Usage

```
import {Match, Scoreboard,SummaryByTotalScore, Team} from 'test-task-sport-library';

// Create teams
const team1 = new Team('Team A');
const team2 = new Team('Team B');

// Create a scoreboard with a summary strategy
const scoreboard = new Scoreboard(new SummaryByTotalScore());

//Create a match between the teams
const match = new Match(team1, team2, 0, 0, new Date());

//Add match to the scoreboard
scoreboard.startMatch(match);

//Update match scores
match.setScore(1, 2);
//OR
scoreboard.matches[0].setScore(1, 2);

//Get the current summary of the match
const summary = scoreboard.getDefaultSummary();
//OR
new SummaryByTotalScore().getSummary(scoreboard.matches);

//Remove the match from the scoreboard
scoreboard.finishMatch(match);

```

## Notes and assumptions

- I decided to use startTime property in matches for summary sorting. It may not be required depending on the requirement interpretation.
- The matches are created manually before adding them to scoreboard. I think this is a good opportunity to use factory method or class, but I didn't add them to keep everything simple, as for now it is not required.
