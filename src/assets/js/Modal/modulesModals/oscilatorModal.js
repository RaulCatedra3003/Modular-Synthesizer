export {showOscilatorModal, changeOscilatorPropertyes, hiddeOscilatorModal};

import {showModal, removeModalEventListeners, addPrincipalEventListeners} from "../openCloseModal.js";
import {arrayOfModules} from "../../synth/synthesizer.js";

let elementTarguet;

function showOscilatorModal(e) {
    if(e.target.getAttribute("id") !== null) {
        elementTarguet = e.target;
        const modalContent = document.getElementById("modal--content");
        showModal();
        modalContent.innerHTML = "";
        modalContent.innerHTML = `
        <h2 class="modal--title">${e.target.dataset.name}</h2>
        <form class="form">
            <label for="oscilatorName" class="label">Module name:</label>
            <input type="text" id="oscilatorName" class="input" maxlength="15">
            <label for="oscilatorWaveType" class="label">Wave type:</label>
            <select name="oscilatorWaveType" id="oscilatorWaveType" class="input">
                <option value="Sine" class="waveOption">Sine</option>
                <option value="Square" class="waveOption">Square</option>
                <option value="Triangle" class="waveOption">Triangle</option>
                <option value="Sawtooth" class="waveOption">Sawtooth</option>
            </select>
            <fieldset class="form--buttons">
                <button type="button" class="modal--buttons" id="save">Save</button>
                <button type="button" class="modal--buttons" id="cancel">Cancel</button>
            </fieldset>
        </form>`;
        const nInput = document.getElementById("oscilatorName");
        const options = document.querySelectorAll(".waveOption");
        const save = document.getElementById("save");
        const cancel = document.getElementById("cancel");
        nInput.value = `${e.target.dataset.name}`;
        options.forEach(element => {
            if(element.value === e.target.dataset.wave) {
                element.setAttribute("selected", "selected");
            }
        });
        save.addEventListener("click", changeOscilatorPropertyes);
        cancel.addEventListener("click", hiddeOscilatorModal);
    }
}

function changeOscilatorPropertyes() {
    const modal = document.getElementById("modal--section");
    const moduleName = document.getElementById(`${elementTarguet.id}--name`);
    const moduleWaveName = document.getElementById(`${elementTarguet.id}--waveName`);
    const nInput = document.getElementById("oscilatorName");
    const nWInput = document.getElementById("oscilatorWaveType");
    moduleName.innerHTML = `${nInput.value}`;
    moduleWaveName.innerHTML = `${nWInput.value}`;
    elementTarguet.dataset.name = `${nInput.value}`;
    elementTarguet.dataset.wave = `${nWInput.value}`;
    arrayOfModules.forEach(e => {
        if(e.id = elementTarguet.id) {
            e.name = `${nInput.value}`;
            e.waveType = `${nWInput.value}`;
            e.changeWaveForm;
        }
    });
    removeModalEventListeners("modulesModalOscilator");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}
function hiddeOscilatorModal() {
    const modal = document.getElementById("modal--section");
    removeModalEventListeners("modulesModalOscilator");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}