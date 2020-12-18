export {createOscilatorModule, oscilatorCounter};

import {addDraggableListeners} from "../dragableModules.js";
import {arrayOfModules} from "../../synth/synthesizer.js";

let oscilatorCounter = 1;

function createOscilatorModule(context) {
    const mainContent = document.getElementById("main--content");
    const newModule = new Oscilator(context);
    oscilatorCounter ++;
    arrayOfModules.push(newModule);
    const section = newModule.moduleShow;
    mainContent.appendChild(section);
    const modules = document.querySelectorAll(".module");
    modules.forEach(e => {
        addDraggableListeners(e.getAttribute("id"));
    })
}

class Oscilator {
    constructor(context, name = `Oscilator ${oscilatorCounter}`, type = "oscilator") {
        this.name = name;
        this.type = type;
        this.module = context.createOscillator();
        this.htmlCode = `
        <h2 class="module--name">${this.name}</h2>
        <section class="module--inputs__oscilator">
            <ul class="input--list">
                <li><button class="connection--input"></button></li>
                <li>Frequency</li>
            </ul>
        </section>`;
    }

    get moduleShow() {
        return this.moduleCreate();
    }

    moduleCreate() {
        const section = document.createElement("section");
        section.classList.add("oscilator");
        section.classList.add("module");
        section.setAttribute("id", `Oscilator${oscilatorCounter}`);
        section.innerHTML = this.htmlCode;
        return section;
    }
}