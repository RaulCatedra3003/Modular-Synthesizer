export {createModule};

import {createAudioOutputModule} from "./modulesType/audioOutput.js";
import {createOscilatorModule} from "./modulesType/oscilator.js";
import {removeModalEventListeners, addPrincipalEventListeners} from "../Modal/openCloseModal.js";

function createModule(e) {
    const modal = document.getElementById("modal--section");
    if(e.target.dataset.modulename === "Audio Output") {
        createAudioOutputModule();
        removeModalEventListeners("Audio Output");
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    } else if(e.target.dataset.modulename === "Oscilator") {
        createOscilatorModule();
        removeModalEventListeners("Oscilator");
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    } else if(e.target.dataset.modulename === "Potenciometer") {
        console.log("creamos un potenciometro");
        removeModalEventListeners("Potenciometer");
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    }
}