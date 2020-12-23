export {openHelpSecctionModal};

import {showModal} from '../openCloseModal.js';

function openHelpSecctionModal() {
    const modalContent = document.getElementById("modal--content");
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `
    <h2 class="modal--title">APP HELP</h2>
    <p class="modal--help">This app is a aproximation to a modular synth.</p>
    <p class="modal--help">You need to create at least one oscillator and the audio output.</p>
    <p class="modal--help">You need to connect the modules clicking in it's inputs or outputs.</p>
    <p class="modal--help">Then you have to finish the connection clicking in other input or output</p>
    <p class="modal--help">When connections are created, you can click on play to lisent the audio</p>
    <p class="modal--help">You can click on clear to erase the modules.</p>
    <p class="modal--help">You can click on save to save the synth.</p>`;
}