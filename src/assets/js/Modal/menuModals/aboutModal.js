export {openAboutSecctionModal};

import {showModal} from '../openCloseModal.js';

function openAboutSecctionModal() {
    const modalContent = document.getElementById("modal--content");
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `ABOUT`;
}