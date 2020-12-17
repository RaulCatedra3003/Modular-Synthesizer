export {clearMainContent};

import {arrayOfModules} from "../synth/synthesizer.js";

function clearMainContent() {
    const mainContent = document.getElementById("main--content");
    mainContent.innerHTML = '';
    arrayOfModules = "";
}