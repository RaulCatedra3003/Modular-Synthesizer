export {createModule, audioCtx};

import {createAudioOutputModule} from "./modulesType/audioOutput.js";
import {createOscilatorModule} from "./modulesType/oscilator.js";
import {createPotenciometerModule} from "./modulesType/potenciometer.js"
import {removeModalEventListeners, addPrincipalEventListeners} from "../Modal/openCloseModal.js";
import {arrayOfModules} from "../synth/synthesizer.js";

const audioCtx = new (window.AudioContext || window.webkitAudioContext) ();
let audioOutputExist;


function createModule(e) {
    const modal = document.getElementById("modal--section");
    if(arrayOfModules.length === 0) {
        audioCtx.resume();
    }
    if(e.target.dataset.modulename === "Audio Output") {
        if(arrayOfModules.length === 0) {
            audioOutputExist = false;
        } else {
            arrayOfModules.forEach(e => {
                if(e.type === "audioOutput") {
                    audioOutputExist = true;
                }
            });
        }
        if(audioOutputExist === true) {
            alert("You can only create one Audio Output");
            removeModalEventListeners("modules");
            addPrincipalEventListeners();
            modal.classList.toggle("hidden");
        } else {
            createAudioOutputModule(audioCtx);
            removeModalEventListeners("Modules");
            addPrincipalEventListeners();
            modal.classList.toggle("hidden");
        }
    } else if(e.target.dataset.modulename === "Oscilator") {
        createOscilatorModule(audioCtx);
        removeModalEventListeners("modules");
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    } else if(e.target.dataset.modulename === "Potenciometer") {
        createPotenciometerModule();
        removeModalEventListeners("modules");
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    }
}