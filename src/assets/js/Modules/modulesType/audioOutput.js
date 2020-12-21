export {createAudioOutputModule};

import {addDraggableListeners} from "../dragableModules.js";
import {arrayOfModules} from "../../synth/synthesizer.js";
import {showAudioOutputModal} from "../../Modal/modulesModals/audioOutputModal.js";
import {drawSvgLine} from "../../svg/svgLines.js";

function createAudioOutputModule(context) {
    const mainContent = document.getElementById("main--content");
    const newModule = new AudioOutput(context);
    arrayOfModules.push(newModule);
    const section = newModule.moduleShow;
    mainContent.appendChild(section);
    const audioOutput = document.getElementById("audioOutput");
    const modules = document.querySelectorAll(".module");
    const inputs = document.querySelectorAll(".connection--input");
    modules.forEach(e => {
        addDraggableListeners(e.getAttribute("id"));
    })
    audioOutput.addEventListener("dblclick", showAudioOutputModal);
    inputs.forEach(e => {
        e.addEventListener("click", drawSvgLine);
    })
}

class AudioOutput {
    constructor(context, name = "Audio Output", type = "audioOutput") {
        this.name = name;
        this.type = type;
        this.module = context.createStereoPanner();
        this.htmlCode = `
        <h2 class="module--name" id="audioOutput--name">${this.name}</h2>
        <section class="module--inputs__audio--output">
            <section class="module--input__L">
                <ul class="input--list">
                    <li><button class="connection--input" id="audioL"></button></li>
                    <li>Left</li>
                </ul>
            </section>
            <section class="module--input__R">
                <ul class="input--list">
                    <li><button class="connection--input" id="audioR"></button></li>
                    <li>Right</li>
                </ul>
            </section>
        </section>`
    }

    get connect() {
        return this.connectSpeakers();
    }
    get moduleShow() {
        return this.moduleCreate();
    }

    connectSpeakers() {
        return this.module.connect(context.destination);
    }
    moduleCreate() {
        const section = document.createElement("section");
        section.classList.add("audio--output");
        section.classList.add("module");
        section.setAttribute("id", "audioOutput");
        section.dataset.name = this.name;
        section.innerHTML = this.htmlCode;
        return section;
    }
}