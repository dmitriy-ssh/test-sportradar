import { ITeam } from "./interface";

export class Team implements ITeam {
  readonly name: string;
  readonly id: Symbol;

  constructor(name: string) {
    this.name = name;
    this.id = Symbol();
  }
}
