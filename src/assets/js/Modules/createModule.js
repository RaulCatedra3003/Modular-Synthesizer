export {createModule};

import {createAudioOutputModule} from "./modulesType/audioOutput.js";
import {createOscilatorModule} from "./modulesType/oscilator.js";
import {createPotenciometerModule} from "./modulesType/potenciometer.js"
import {removeModalEventListeners, addPrincipalEventListeners} from "../Modal/openCloseModal.js";

function createModule(e) {
    const modal = document.getElementById("modal--section");
    if(e.target.dataset.modulename === "Audio Output") {
        createAudioOutputModule();
        removeModalEventListeners("Modules");
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    } else if(e.target.dataset.modulename === "Oscilator") {
        createOscilatorModule();
        removeModalEventListeners("Modules");
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    } else if(e.target.dataset.modulename === "Potenciometer") {
        createPotenciometerModule();
        removeModalEventListeners("Modules");
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    }
}