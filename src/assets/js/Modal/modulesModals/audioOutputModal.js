export {showAudioOutputModal, changeAudioOutputPropertyes, hiddeAudioOutputModal}

import {showModal, removeModalEventListeners, addPrincipalEventListeners} from "../openCloseModal.js";
import {arrayOfModules} from "../../synth/synthesizer.js";

let elementTarguet;

function showAudioOutputModal(e) {
    if(e.target.getAttribute("id") !== null) {
        elementTarguet = e.target;
        const modalContent = document.getElementById("modal--content");
        showModal();
        modalContent.innerHTML = "";
        modalContent.innerHTML = `
        <h2 class="modal--title">${e.target.dataset.name}</h2>
        <form class="form">
            <label for="audioOutputName" class="label">Module name:</label>
            <input type="text" id="audioOutputName" class="input" maxlength="15">
            <fieldset class="form--buttons">
                <button type="button" class="modal--buttons" id="save">Save</button>
                <button type="button" class="modal--buttons" id="cancel">Cancel</button>
            </fieldset>
        </form>`;
        const nInput = document.getElementById("audioOutputName");
        const save = document.getElementById("save");
        const cancel = document.getElementById("cancel");
        nInput.value = `${e.target.dataset.name}`;
        save.addEventListener("click", changeAudioOutputPropertyes);
        cancel.addEventListener("click", hiddeAudioOutputModal);
    }
};

function changeAudioOutputPropertyes() {
    const modal = document.getElementById("modal--section");
    const moduleName = document.getElementById(`audioOutput--name`);
    const nInput = document.getElementById("audioOutputName");
    moduleName.innerHTML = `${nInput.value}`;
    elementTarguet.dataset.name = `${nInput.value}`;
    arrayOfModules.forEach(e => {
        if(e.type = "audioOutput") {
            e.name = `${nInput.value}`;
        }
    })
    removeModalEventListeners("audioOutput");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}
function hiddeAudioOutputModal() {
    const modal = document.getElementById("modal--section");
    removeModalEventListeners("audioOutput");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}