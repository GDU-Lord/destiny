import { uuid } from "../core.js";
import { Interface } from "./interface.js";

export class Character {

  public static interfaces: Interface[] = [];

  static bind(int: Interface) {
    this.interfaces.push(int);
  }

  constructor(
    public id: string = uuid(),

    public name: string = "",
    public playerName: string = "",
    public backstoryTitle: string = "",
    public mode: "edit" | "view" = "view",

    public maxPoints: number = 10,

    public shock: number = 0,
    public mentalWounds: number = 0,
    public physicalWounds: number = 0,
    public state: "none" | "shock" | "fear" | "incapacitated" = "none",

    public backstory: string = "",
    public notes: string = "",

    public skills: {
      [key: string]: Skill
    } = {},

    public feats: {
      [key: string]: Feat
    } = {}

  ) {
    Character.interfaces.forEach(int => int.bind(this));
    this.update();
  }

  update() {
    this.state = "none";
    if(this.shock > 0) this.state = "shock";
    if(this.mentalWounds >= 5) this.state = "fear";
    if(this.physicalWounds >= 5) this.state = "incapacitated";
    Character.interfaces.forEach(int => int.write());
  }

}

export class Skill {

  constructor(
    public level: 1 | 2 | 3,
    public base: Skill | null,
    public name: string = "",
    public plus: boolean = false,
    public id: string = uuid()
  ) {}

  add(char: Character) {
    char.skills[this.id] = this;
  }

}

export class Feat {

  constructor(
    public name: string = "",
    public value: number = 1,
    public type: "positive" | "negative" | "neutral",
    public text: string = "",
    public id: string = uuid()
  ) {}

}