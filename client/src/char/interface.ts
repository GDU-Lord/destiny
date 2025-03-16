import { Character, Skill } from "./objects.js";

export class Interface {

  object!: {
    [key: string]: any;
  };

  constructor(
    public field: keyof Character, 
    public target: Element
  ) {}

  bind(object: {
    [key: string]: any;
  }) {
    this.object = object;
    this.init();
  }

  init() {
  
  }

  read() {

  }

  write() {

  }

}

export class TextInterface extends Interface {

  declare target: HTMLInputElement;

  init() {
    this.target.addEventListener("input", e => {
      this.read();
    });
  }

  read() {
    this.object[this.field] = this.target.value;
  }

  write() {
    this.target.value = this.object[this.field];
  }

}

export class TextDisplayInterface extends Interface {

  constructor(field: keyof Character, target: Element, public map: { [key: string]: string }) {
    super(field, target);
  }

  declare target: HTMLHeadingElement;

  write() {
    this.target.innerText = this.map[this.object[this.field]] ?? this.object[this.field];
  }

}

export class NumberScaleInterface extends Interface {

  constructor(field: keyof Character, target: Element, public min: number, public max: number) {
    super(field, target);
  }

  declare target: HTMLDivElement;

  init() {
    const list = this.target.querySelectorAll("button");
    list.forEach((item) => {
      item.addEventListener("click", e => {
        list.forEach(item2 => item2.classList.remove("button-selected"));
        item.classList.add("button-selected");
        this.read();
      });
    });
  }

  read() {
    this.target.querySelectorAll("button").forEach((item, index) => {
      if(!item.classList.contains("button-selected")) return;
      this.object[this.field] = index - this.min;
      this.object.update();
    });
  }

  write() {
    const value = this.object[this.field] as number;
    const index = value + this.min;
    if(value > this.max) return;
    const list = this.target.querySelectorAll("button");
    list.forEach(item => item.classList.remove("button-selected"));
    list[index].classList.add("button-selected");
  }

}