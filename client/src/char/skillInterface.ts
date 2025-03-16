import { Interface } from "./interface.js";
import { Character, Skill } from "./objects.js";

export class SkillsInterface extends Interface {

    declare target: HTMLDivElement;
    declare object: Character;
  
    init(): void {
      const add = this.target.querySelector("#add-skill-1") as HTMLButtonElement;
      add.addEventListener("click", () => {
        const skill = new Skill(1, null);
        skill.add(this.object);
        this.object.update();
      });
    }
  
    write(): void {
      const h1 = this.target.querySelector("h1") as HTMLHeadingElement;
      const buttons = this.target.querySelectorAll("button");
      const add = buttons[buttons.length-1];
      this.target.innerHTML = "";
      this.target.append(h1);
      const skills = this.object.skills;
      const skillMap: {
        [key: string]: HTMLDivElement;
      } = {};
      for(const id in skills) {
        const skill = skills[id];
        if(skill.level === 1) this.renderSkill1(skill);
        if(skill.level === 2) this.renderSkill2(skill);
      }
      this.target.append(add);
    }

    // <tr>
    //     <td class="table-lable">(II)</td>
    //     <td>
        //     <div class="flex-container">
        //         <input type="text" name="1" class="skill__level-2">
        //         <button>+</button>
        //     </div>
    //     </td>
    //     <td>
        //     <div class="flex-container">
        //         <input type="text" name="2" class="skill__level-2">
        //         <button>+</button>
        //     </div>
    //     </td>
    // </tr>

    renderSkill2 = (skill: Skill) => {
        console.log(skill);
        const base = this.target.querySelector(`table[name="${skill.base!.id}"`)!;
        let tr = base.querySelectorAll("tr");
        console.log(tr.length);
        if(tr.length < 3) {
            const row = document.createElement("tr");
            base.append(row);
            tr = base.querySelectorAll("tr");
        }
        const td = tr[2].querySelectorAll("td");
        if(td.length === 0) {
            const lable = document.createElement("td");
            lable.classList.add("table-lable");
            lable.innerText = "(II)";
            
            tr[2].append(lable);
        }
        if(td.length < 3) {
            const box = document.createElement("td");
            const flex = document.createElement("div");
            flex.classList.add("flex-container");
            const field = document.createElement("input");
            field.setAttribute("name", skill.id);
            field.classList.add("skill__level-2");
            const togglePlus = document.createElement("button");
            togglePlus.innerText = "+";
            
            tr[2].append(box);
            box.append(flex);
            flex.append(field, togglePlus);
        }
    }

    renderSkill1 = (skill: Skill) => {
        const table = document.createElement("table");
        table.setAttribute("name", skill.id);
        table.classList.add("char__skill-table");
        const body = document.createElement("tbody");
        const field_row = document.createElement("tr");
        const button_row = document.createElement("tr");
        const lable = document.createElement("td");
        lable.innerText = "(I)";
        lable.classList.add("table-lable");
        const lable_empty = document.createElement("td");
        lable_empty.classList.add("table-lable");
        const field_box = document.createElement("td");
        field_box.setAttribute("colspan", "2");
        const add_2_box = document.createElement("td");
        add_2_box.setAttribute("colspan", "2");
        const field_flex = document.createElement("div");
        field_flex.classList.add("flex-container");
        const field = document.createElement("input");
        field.setAttribute("name", skill.id);
        field.classList.add("skill__level-1");
        const togglePlus = document.createElement("button");
        togglePlus.innerText = "+";
        if(skill.plus) togglePlus.classList.add("button-selected");
        const add_2 = document.createElement("button");
        add_2.innerText = "+ (II)";
    
        this.target.append(table);
        table.append(body);
        body.append(field_row, button_row);
        field_row.append(lable, field_box);
        field_box.append(field_flex);
        field_flex.append(field, togglePlus);
        button_row.append(lable_empty, add_2_box);
        add_2_box.append(add_2);
    
        togglePlus.addEventListener("click", () => {
          skill.plus = !skill.plus;
          this.object.update();
        });
        add_2_box.addEventListener("click", () => {
            const newSkill = new Skill(2, skill);
            newSkill.add(this.object);
            this.object.update();
        });
    }

  }