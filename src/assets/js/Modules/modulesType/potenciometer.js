export {createPotenciometerModule, potenciometerCounter};

import {addDraggableListeners} from "../dragableModules.js";
import {arrayOfModules} from "../../synth/synthesizer.js";
import {showPotenciometerModal} from "../../Modal/modulesModals/potenciometerModal.js";
import {drawSvgLine} from "../../svg/svgLines.js";

let potenciometerCounter = 1;

function createPotenciometerModule() {
    const mainContent = document.getElementById("main--content");
    const newModule = new Potenciometer();
    arrayOfModules.push(newModule);
    const section = newModule.moduleShow;
    mainContent.appendChild(section);
    const potenciometer = document.getElementById(`potenciometer${potenciometerCounter}`);
    potenciometerCounter ++;
    const modules = document.querySelectorAll(".module");
    const outputs = document.querySelectorAll(".connection--output");
    modules.forEach(e => {
        addDraggableListeners(e.getAttribute("id"));
    })
    potenciometer.addEventListener("dblclick", showPotenciometerModal);
    outputs.forEach(e => {
        e.addEventListener("click", drawSvgLine);
    })
}

class Potenciometer {
    constructor(name = `Pot ${potenciometerCounter}`, id = `potenciometer${potenciometerCounter}`, type = "potenciometer") {
        this.name = name;
        this.id = id;
        this.type = type;
        this.htmlCode = `
        <h2 class="module--name" id="potenciometer${potenciometerCounter}--name">${this.name}</h2>
        <input type="range" class="input--potenciometer" min="0" max="10" id="potenciometer${potenciometerCounter}--input">
        <section class="module--output__potenciometer">
            <ul class="output--list">
                <li class="outputName">Output</li>
                <li><button class="connection--output" id="potenciometer${potenciometerCounter}--output"></button></li>
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
        section.setAttribute("id", this.id);
        section.dataset.name = this.name;
        section.innerHTML = this.htmlCode;
        return section;
    }
}