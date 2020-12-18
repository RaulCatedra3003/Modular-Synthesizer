export {openNewSecctionModal};

import {showModal} from '../openCloseModal.js';
import {createModule} from "../../Modules/createModule.js";


function openNewSecctionModal() {
    const modalContent = document.getElementById("modal--content");
    showModal();
    modalContent.innerHTML = "";
    modalContent.innerHTML = `
    <h2 class="modal--title">New Module</h2>
                <ul class="modules--list">
                    <li class="modules--type" data-modulename="Audio Output">Audio Output</li>
                    <li class="modules--type" data-modulename="Oscilator">Oscilator</li>
                    <li class="modules--type" data-modulename="Potenciometer">Potenciometer</li>
                </ul>`;
    const modulesTypes = document.querySelectorAll(".modules--type");
    modulesTypes.forEach(e => {
        e.addEventListener("click", createModule);
    });
};