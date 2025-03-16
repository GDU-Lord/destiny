import { NumberScaleInterface, TextDisplayInterface, TextInterface } from "./char/interface.js";
import { Character } from "./char/objects.js";
import { SkillsInterface } from "./char/skillInterface.js";
import { $ } from "./core.js";

Character.bind(new TextInterface("name", $("#char__name")!));
Character.bind(new TextInterface("playerName", $("#char__playerName")!));
Character.bind(new TextInterface("backstoryTitle", $("#char__backstoryTitle")!));

Character.bind(new TextInterface("backstory", $("#char__backstory")!));
Character.bind(new TextInterface("notes", $("#char__notes")!));

Character.bind(new TextDisplayInterface("state", $("#char__state")!, {
  "none": "Стан: Немає",
  "fear": "Стан: Заляканий",
  "incapacitated": "Стан: Недієздатний",
  "shock": "Стан: Шокований",
}));

Character.bind(new NumberScaleInterface("shock", $("#char__shock")!, 0, 9));
Character.bind(new NumberScaleInterface("mentalWounds", $("#char__mentalWounds")!, 0, 5));
Character.bind(new NumberScaleInterface("physicalWounds", $("#char__physicalWounds")!, 0, 9));

Character.bind(new SkillsInterface("skills", $("#char__skills")!));

export let char: Character | null = null;

export function loadData() {
  char = new Character;
  eval("window.char = char");
}