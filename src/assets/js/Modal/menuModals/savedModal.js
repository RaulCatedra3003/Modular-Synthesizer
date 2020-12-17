export {openSavedSecctionModal};

import {showModal} from '../openCloseModal.js';

function openSavedSecctionModal() {
    const modalContent = document.getElementById("modal--content");
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `SAVED SYNTHS`;
}