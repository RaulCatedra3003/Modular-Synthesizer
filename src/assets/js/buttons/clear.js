export {clearMainContent};

import {arrayOfModules} from "../synth/synthesizer.js";
import {oscilatorCounter} from "../Modules/modulesType/oscilator.js";
import {potenciometerCounter} from "../Modules/modulesType/potenciometer.js";
import {audioCtx} from "../Modules/createModule.js";
import {lineCounter} from "../svg/svgLines.js"

const svgContent = document.getElementById("svg--content");

function clearMainContent() {
    const mainContent = document.getElementById("main--content");
    mainContent.innerHTML = '';
    svgContent.innerHTML = '';
    arrayOfModules = [];
    oscilatorCounter = 1;
    potenciometerCounter = 1;
    lineCounter = 1;
    audioCtx.suspend();
}