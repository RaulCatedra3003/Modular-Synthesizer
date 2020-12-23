export {createAudioOutputModule, AudioOutput};

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
    constructor(context, name = "Audio Output", type = "AudioOutput", id = "audioOutput") {
        this.context = context;
        this.name = name;
        this.type = type;
        this.id = id;
        this.pannerL = this.context.createStereoPanner();
        this.pannerR = this.context.createStereoPanner();
        this.htmlCode = `
        <h2 class="module--name" id="audioOutput--name">${this.name}</h2>
        <section class="module--inputs__audio--output">
            <section class="module--input__L">
                <ul class="input--list">
                    <li><button class="connection--input" id="audioL--input"></button></li>
                    <li id="audioL--input__name">Left</li>
                </ul>
            </section>
            <section class="module--input__R">
                <ul class="input--list">
                    <li><button class="connection--input" id="audioR--input"></button></li>
                    <li id="audioR--input__name">Right</li>
                </ul>
            </section>
        </section>`
    }

    get dConnect() {
        return this.connectSpeakers();
    }
    get moduleShow() {
        return this.moduleCreate();
    }

    connectSpeakers() {
        this.pannerL.connect(this.context.destination);
        this.pannerL.pan.value = -1;
        this.pannerR.connect(this.context.destination);
        this.pannerR.pan.value = 1;
    }
    moduleCreate() {
        const section = document.createElement("section");
        section.classList.add("audio--output");
        section.classList.add("module");
        section.setAttribute("id", this.id);
        section.dataset.name = this.name;
        section.innerHTML = this.htmlCode;
        return section;
    }
}