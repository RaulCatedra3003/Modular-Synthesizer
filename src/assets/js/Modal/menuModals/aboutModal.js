export {openAboutSecctionModal};

import {showModal} from '../openCloseModal.js';

function openAboutSecctionModal() {
    const modalContent = document.getElementById("modal--content");
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `
    <h2 class="modal--title">ABOUT</h2>
    <p class="modal--about">This app is a aproximation to a modular synth.</p>
    <p class="modal--about">This app is created by Raúl Cátedra.</p>
    <p class="modal--about">If you want to report bugs or improve the app click in the linkg below</p>
    <p class="modal--about"><a class="modal--link" href="https://github.com/RaulCatedra3003/Modular-Synthesizer">App repository</a></p>`;
}