export {createAudioOutputModule};

import {addDraggableListeners} from "../dragableModules.js";
import {arrayOfModules} from "../../synth/synthesizer.js";

function createAudioOutputModule(context) {
    const mainContent = document.getElementById("main--content");
    const newModule = new AudioOutput(context);
    arrayOfModules.push(newModule);
    const section = newModule.moduleShow;
    mainContent.appendChild(section);
    const modules = document.querySelectorAll(".module");
    modules.forEach(e => {
        addDraggableListeners(e.getAttribute("id"));
    })
}

class AudioOutput {
    constructor(context, name = "Audio Output", type = "audioOutput") {
        this.name = name;
        this.type = type;
        this.module = context.createStereoPanner();
        this.htmlCode = `
        <h2 class="module--name">${this.name}</h2>
        <section class="module--inputs__audio--output">
            <section class="module--input__L">
                <ul class="input--list">
                    <li><button class="connection--input"></button></li>
                    <li>Left</li>
                </ul>
            </section>
            <section class="module--input__R">
                <ul class="input--list">
                    <li><button class="connection--input"></button></li>
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
        section.innerHTML = this.htmlCode;
        return section;
    }
}