export {createOscilatorModule, oscilatorCounter};

import {addDraggableListeners} from "../dragableModules.js";
import {arrayOfModules} from "../../synth/synthesizer.js";
import {showOscilatorModal} from "../../Modal/modulesModals/oscilatorModal.js";
import {drawSvgLine} from "../../svg/svgLines.js";

let oscilatorCounter = 1;

function createOscilatorModule(context) {
    const mainContent = document.getElementById("main--content");
    const newModule = new Oscilator(context);
    arrayOfModules.push(newModule);
    const section = newModule.moduleShow;
    mainContent.appendChild(section);
    const oscilator = document.getElementById(`oscilator${oscilatorCounter}`);
    oscilatorCounter ++;
    const modules = document.querySelectorAll(".module");
    const inputs = document.querySelectorAll(".connection--input");
    const outputs = document.querySelectorAll(".connection--output");
    modules.forEach(e => {
        addDraggableListeners(e.getAttribute("id"));
    });
    oscilator.addEventListener("dblclick", showOscilatorModal);
    inputs.forEach(e => {
        e.addEventListener("click", drawSvgLine);
    })
    outputs.forEach(e => {
        e.addEventListener("click", drawSvgLine);
    })
}

class Oscilator {
    constructor(context, name = `Oscilator ${oscilatorCounter}`, id = `oscilator${oscilatorCounter}`, type = "oscilator") {
        this.name = name;
        this.id = id;
        this.type = type;
        this.waveType = "Sine";
        this.module = context.createOscillator();
        this.htmlCode = `
        <h2 class="module--name" id="oscilator${oscilatorCounter}--name">${this.name}</h2>
        <h2 class="wave--title" id="oscilator${oscilatorCounter}--waveTitle">Wave Type</h2>
        <h2 class="wave--name" id="oscilator${oscilatorCounter}--waveName">${this.waveType}</h2>
        <section class="module--inputs__oscilator">
            <ul class="input--list">
                <li><button class="connection--input" id="oscilator${oscilatorCounter}--input"></button></li>
                <li id="oscilator${oscilatorCounter}--input__name">Frequency</li>
            </ul>
        </section>
        <section class="module--output__oscilator">
            <ul class="output--list">
                <li class="outputName" id="oscilator${oscilatorCounter}--output__name">Output</li>
                <li><button class="connection--output" id="oscilator${oscilatorCounter}--output"></button></li>
            </ul>
        </section>`;
    }

    get moduleShow() {
        return this.moduleCreate();
    }

    get changeWave() {
        return this.changeWaveForm();
    }

    moduleCreate() {
        const section = document.createElement("section");
        section.classList.add("oscilator");
        section.classList.add("module");
        section.setAttribute("id", this.id);
        section.dataset.name = this.name;
        section.dataset.wave = this.waveType;
        section.innerHTML = this.htmlCode;
        return section;
    }

    changeWaveForm() {
        this.module.type = this.waveType.toLowerCase();
    }
}