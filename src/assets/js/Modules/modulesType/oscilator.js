export {createOscilatorModule};

import {makeItDragable} from "../dragableModules.js";

function createOscilatorModule() {
    const mainContent = document.getElementById("main--content");
    const section = document.createElement("section");
    section.classList.add("oscilator");
    section.classList.add("module");
    section.dataset.dragable = "true";
    section.innerHTML = `
    <h2 class="module--name">Oscilator</h2>
    <section class="module--inputs__oscilator">
        <ul class="input--list">
            <li><button class="connection--input"></button></li>
            <li>Frequency</li>
        </ul>
    </section>`
    mainContent.appendChild(section);
    const modules = document.querySelectorAll(".module");
    modules.forEach(e => {
        e.addEventListener("mousedown", makeItDragable);
    })
}