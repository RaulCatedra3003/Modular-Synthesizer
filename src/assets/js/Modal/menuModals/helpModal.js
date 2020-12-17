export {openHelpSecctionModal};

import {showModal} from '../openCloseModal.js';

function openHelpSecctionModal() {
    const modalContent = document.getElementById("modal--content");
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `APP HELP`;
}