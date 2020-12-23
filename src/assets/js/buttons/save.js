export {saveSynth, saveSynthInLocalStorage, hiddeSaveModal, saveObjectInLocalStorage, objectToSaveInLocalStorage};

import {arrayOfModules} from "../synth/synthesizer.js";
import {showModal} from "../Modal/openCloseModal.js";
import {removeModalEventListeners, addPrincipalEventListeners} from "../Modal/openCloseModal.js";

let objectToSaveInLocalStorage = {};

function saveSynth() {
    saveObjectInLocalStorage();
    if(arrayOfModules.length === 0) {
        alert("You have to create a synth before save it");
    } else {
        showModal();
        const modalContent = document.getElementById("modal--content");
        modalContent.innerHTML = "";
        modalContent.innerHTML = `
        <h2 class="modal--title">SYNTH NAME</h2>
        <form class="form">
            <label for="modularSynthName" class="label">Enter a synth name to save:</label>
            <input type="text" id="modularSynthName" class="input" maxlength="20">
            <fieldset class="form--buttons">
                <button type="button" class="modal--buttons" id="save">Save</button>
                <button type="button" class="modal--buttons" id="cancel">Cancel</button>
            </fieldset>
        </form>`;
        const save = document.getElementById("save");
        const cancel = document.getElementById("cancel");
        save.addEventListener("click", saveSynthInLocalStorage);
        cancel.addEventListener("click", hiddeSaveModal);
    }
}

function saveSynthInLocalStorage() {
    const modal = document.getElementById("modal--section");
    const sName = document.getElementById("modularSynthName");
    const lines = document.querySelectorAll("line");
    const modules = document.querySelectorAll(".module");
    let arrayOfLines = [];
    let arrayOfModulesToSave = [];
    lines.forEach(k => {
        let lineObject = {
            "x1": k.getAttribute("x1"),
            "y1": k.getAttribute("y1"),
            "x2": k.getAttribute("x2"),
            "y2": k.getAttribute("y2"),
            "connections": k.dataset.connections
        }
        arrayOfLines.push(lineObject);
    })
    modules.forEach(l => {
        if(l.id.includes("audio")) {
            let moduleObject = {
                "name": l.dataset.name,
                "type": "AudioOutput",
                "left": l.style.left,
                "top": l.style.top
            }
            arrayOfModulesToSave.push(moduleObject);
        } else if(l.id.includes("oscilator")) {
            let moduleObject = {
                "name": l.dataset.name,
                "type": "Oscilator",
                "wave": l.dataset.wave,
                "left": l.style.left,
                "top": l.style.top
            }
            arrayOfModulesToSave.push(moduleObject);
        } else if(l.id.includes("potenciometer")) {
            console.log("pot");
            let moduleObject = {
                "name": l.dataset.name,
                "type": "Potenciometer",
                "left": l.style.left,
                "top": l.style.top
            }
            arrayOfModulesToSave.push(moduleObject);
        }
    })
    if(sName.value === ""){
        alert("You need to enter a name for the synth");
    } else {
        objectToSaveInLocalStorage[`${sName.value}`] = {
            "arrayOfModules": arrayOfModulesToSave,
            "arrayOfLines": arrayOfLines
        }
        let objectString = JSON.stringify(objectToSaveInLocalStorage);
        localStorage.setItem('SYNTHS', objectString);
    }
    removeModalEventListeners("save");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}
function hiddeSaveModal() {
    const modal = document.getElementById("modal--section");
    removeModalEventListeners("save");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}

function saveObjectInLocalStorage() {
    if(localStorage.getItem('SYNTHS') === null) {
        let objectString = JSON.stringify(objectToSaveInLocalStorage);
        localStorage.setItem('SYNTHS', objectString);
    } else {
        objectToSaveInLocalStorage = JSON.parse(localStorage.getItem("SYNTHS"));
    }
}