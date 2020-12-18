export {createPotenciometerModule, potenciometerCounter};

import {addDraggableListeners} from "../dragableModules.js";
import {arrayOfModules} from "../../synth/synthesizer.js";

let potenciometerCounter = 1;

function createPotenciometerModule() {
    const mainContent = document.getElementById("main--content");
    const newModule = new Potenciometer();
    potenciometerCounter ++;
    arrayOfModules.push(newModule);
    const section = newModule.moduleShow;
    mainContent.appendChild(section);
    const modules = document.querySelectorAll(".module");
    modules.forEach(e => {
        addDraggableListeners(e.getAttribute("id"));
    })
}

class Potenciometer {
    constructor(name = `Pot ${potenciometerCounter}`, type = "potenciometer") {
        this.name = name;
        this.type = type;
        this.htmlCode = `
        <h2 class="module--name">${this.name}</h2>
        <input type="range" class="input--potenciometer">
        <section class="module--output__potenciometer">
            <ul class="output--list">
                <li class="outputName">Output</li>
                <li><button class="connection--output"></button></li>
            </ul>
        </section>`;
    }

    get moduleShow() {
        return this.moduleCreate();
    }

    moduleCreate() {
        const section = document.createElement("section");
        section.classList.add("potenciometer");
        section.classList.add("module");
        section.setAttribute("id", `Potenciometer${potenciometerCounter}`);
        section.innerHTML = this.htmlCode;
        return section;
    }
}