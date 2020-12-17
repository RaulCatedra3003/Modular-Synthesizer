export {openAboutSecctionModal};

import {showModal} from '../openCloseModal.js';

function openAboutSecctionModal() {
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `ABOUT`;
}