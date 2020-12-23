export {openSavedSecctionModal, createSynthFromLocalStorage};

import {showModal} from '../openCloseModal.js';
import {saveObjectInLocalStorage, objectToSaveInLocalStorage} from "../../buttons/save.js";
import {removeModalEventListeners, addPrincipalEventListeners} from "../openCloseModal.js";
import {lineCounter} from "../../svg/svgLines.js";
import {AudioOutput} from "../../Modules/modulesType/audioOutput.js";
import {potenciometerCounter, Potenciometer} from "../../Modules/modulesType/potenciometer.js";
import {oscilatorCounter, Oscilator} from "../../Modules/modulesType/oscilator.js";
import {audioCtx} from "../../Modules/createModule.js";
import {arrayOfModules} from "../../synth/synthesizer.js";
import {addDraggableListeners} from "../../Modules/dragableModules.js";
import {showAudioOutputModal} from "../modulesModals/audioOutputModal.js";
import {drawSvgLine} from "../../svg/svgLines.js";
import {showOscilatorModal} from "../modulesModals/oscilatorModal.js";
import {showPotenciometerModal} from "../modulesModals/potenciometerModal.js";


function openSavedSecctionModal() {
    const modalContent = document.getElementById("modal--content");
    saveObjectInLocalStorage();
    let savedSynth = Object.keys(objectToSaveInLocalStorage);
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `
    <h2 class="modal--title">SAVED SYNTHS</h2>
    <ul class="modules--list" id="savedSynths">
    </ul>`;
    const synthList = document.getElementById("savedSynths");
    savedSynth.forEach(element => {
        synthList.innerHTML += `<li class="modules--type" data-synthname="${element}">${element}</li>`;
    })
    const allSavedSynths = document.querySelectorAll(".modules--type");
    allSavedSynths.forEach(e => {
        e.addEventListener("click", createSynthFromLocalStorage);
    })
}

function createSynthFromLocalStorage(e) {
    audioCtx.resume();
    const modal = document.getElementById("modal--section");
    const synthToCreate = objectToSaveInLocalStorage[e.target.dataset.synthname];
    const svgContent = document.getElementById("svg--content");
    const mainContent = document.getElementById("main--content");
    svgContent.innerHTML = "";
    mainContent.innerHTML = "";
    lineCounter = 1;
    potenciometerCounter = 1;
    oscilatorCounter = 1;
    arrayOfModules = [];
    synthToCreate.arrayOfLines.forEach(element => {
        svgContent.innerHTML += `<line id="line${lineCounter}" class="svg--line" x1=${element.x1} y1=${element.y1} x2=${element.x2} y2=${element.y2} style="stroke:#eeeeee;stroke-width:2" data-connections=${element.connections}/>`
        lineCounter ++;
    })
    synthToCreate.arrayOfModules.forEach(element => {
        if(element.type === "AudioOutput") {
            const newModule = new AudioOutput(audioCtx, element.name, element.type);
            arrayOfModules.push(newModule);
            const section = newModule.moduleShow;
            section.style.left = element.left;
            section.style.top = element.top;
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
        } else if(element.type === "Oscilator") {
            const newModule = new Oscilator(audioCtx, element.name, "Oscilator", `oscilator${oscilatorCounter}`, element.wave);
            const section = newModule.moduleShow;
            arrayOfModules.push(newModule);
            section.style.left = element.left;
            section.style.top = element.top;
            mainContent.appendChild(section);
            const oscilator = document.getElementById(`oscilator${oscilatorCounter}`);
            oscilatorCounter ++;
            const modules = document.querySelectorAll(".module");
            const inputs = document.querySelectorAll(".connection--input");
            const outputs = document.querySelectorAll(".connection--output");
            modules.forEach(e => {
                addDraggableListeners(e.getAttribute("id"));
            });
            oscilator.addEventListener("dblclick", showOscilatorModal);
            inputs.forEach(e => {
                e.addEventListener("click", drawSvgLine);
            })
            outputs.forEach(e => {
                e.addEventListener("click", drawSvgLine);
            })
        } else if(element.type === "Potenciometer"){
            const newModule = new Potenciometer(element.name, `potenciometer${potenciometerCounter}`, "Potenciometer");
            arrayOfModules.push(newModule);
            const section = newModule.moduleShow;
            section.style.left = element.left;
            section.style.top = element.top;
            mainContent.appendChild(section);
            const potenciometer = document.getElementById(`potenciometer${potenciometerCounter}`);
            const potencimoeterRange = document.getElementById(`potenciometer${potenciometerCounter}--input`);
            potenciometerCounter ++;
            const modules = document.querySelectorAll(".module");
            const outputs = document.querySelectorAll(".connection--output");
            modules.forEach(e => {
                addDraggableListeners(e.getAttribute("id"));
            })
            potenciometer.addEventListener("dblclick", showPotenciometerModal);
            outputs.forEach(e => {
                e.addEventListener("click", drawSvgLine);
            })
            potencimoeterRange.addEventListener("mousemove", function(e) {
                e.stopPropagation();
            })
        }
    })

    removeModalEventListeners("savedSynth");
    addPrincipalEventListeners();
    modal.classList.toggle("hidden");
}