export {showPotenciometerModal, changePotenciometerPropertyes, hiddePotenciometerModal}

import {showModal, removeModalEventListeners, addPrincipalEventListeners} from "../openCloseModal.js";
import {arrayOfModules} from "../../synth/synthesizer.js";

let elementTarguet;

function showPotenciometerModal(e) {
    if(e.target.getAttribute("id") !== null) {
        elementTarguet = e.target;
        const modalContent = document.getElementById("modal--content");
        showModal();
        modalContent.innerHTML = "";
        modalContent.innerHTML = `
        <h2 class="modal--title">${e.target.dataset.name}</h2>
        <form class="form">
            <label for="potenciometerName" class="label">Module name:</label>
            <input type="text" id="potenciometerName" class="input" maxlength="15">
            <label for="potenciometerMaxValue" class="label">Max value:</label>
            <input type="number" id="potenciometerMaxValue" class="input" min="1" max="24000">
            <label for="potenciometerMinValue" class="label">Min value:</label>
            <input type="number" id="potenciometerMinValue" class="input" min="0" max="23999">
            <fieldset class="form--buttons">
                <button type="button" class="modal--buttons" id="save">Save</button>
                <button type="button" class="modal--buttons" id="cancel">Cancel</button>
            </fieldset>
        </form>`;
        const potenciometerInput = document.getElementById(`${elementTarguet.id}--input`);
        const nInput = document.getElementById("potenciometerName");
        const maxValueInput = document.getElementById("potenciometerMaxValue");
        const minValueInput = document.getElementById("potenciometerMinValue");
        const save = document.getElementById("save");
        const cancel = document.getElementById("cancel");
        nInput.value = `${e.target.dataset.name}`;
        maxValueInput.value = potenciometerInput.getAttribute("max");
        minValueInput.value = potenciometerInput.getAttribute("min");
        save.addEventListener("click", changePotenciometerPropertyes);
        cancel.addEventListener("click", hiddePotenciometerModal);
    }
}


function changePotenciometerPropertyes() {
    const modal = document.getElementById("modal--section");
    console.log("aqui");
    const moduleName = document.getElementById(`${elementTarguet.id}--name`);
    const moduleInput = document.getElementById(`${elementTarguet.id}--input`);
    const nInput = document.getElementById("potenciometerName");
    const maxValueInput = document.getElementById("potenciometerMaxValue");
    const minValueInput = document.getElementById("potenciometerMinValue");
    moduleName.innerHTML = `${nInput.value}`;
    moduleInput.setAttribute("max", `${maxValueInput.value}`);
    moduleInput.setAttribute("min", `${minValueInput.value}`);
    elementTarguet.dataset.name = `${nInput.value}`;
    arrayOfModules.forEach(e => {
        if(e.id = elementTarguet.id) {
            e.name = `${nInput.value}`;
        }
    });
    removeModalEventListeners("modulesModal");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}
function hiddePotenciometerModal() {
    const modal = document.getElementById("modal--section");
    removeModalEventListeners("modulesModal");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}