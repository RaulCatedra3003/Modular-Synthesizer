export {createPotenciometerModule};

import {makeItDragable} from "../dragableModules.js";

function createPotenciometerModule() {
    const mainContent = document.getElementById("main--content");
    const section = document.createElement("section");
    section.classList.add("potenciometer");
    section.classList.add("module");
    section.dataset.dragable = "true";
    section.innerHTML = `
    <h2 class="module--name">Potenciometer</h2>
    <input type="range" class="input--potenciometer">
    <section class="module--output__potenciometer">
        <ul class="output--list">
            <li class="outputName">Output</li>
            <li><button class="connection--output"></button></li>
        </ul>
    </section>`
    mainContent.appendChild(section);
    const modules = document.querySelectorAll(".module");
    modules.forEach(e => {
        e.addEventListener("mousedown", makeItDragable);
    })
}