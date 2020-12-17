export {openSavedSecctionModal};

import {showModal} from '../openCloseModal.js';

function openSavedSecctionModal() {
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `SAVED SYNTHS`;
}