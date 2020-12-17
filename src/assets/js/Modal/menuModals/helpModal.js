export {openHelpSecctionModal};

import {showModal} from '../openCloseModal.js';

function openHelpSecctionModal() {
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `APP HELP`;
}