export {createAudioOutputModule};

import {makeItDragable} from "../dragableModules.js"

function createAudioOutputModule() {
    const mainContent = document.getElementById("main--content");
    const section = document.createElement("section");
    section.classList.add("audio--output");
    section.classList.add("module");
    section.dataset.dragable = "true";
    section.innerHTML = `
    <h2 class="module--name">Audio Output</h2>
    <section class="module--inputs__audio--output">
        <section class="module--input__L">
            <ul class="input--list">
                <li><button class="connection"></button></li>
                <li>Left</li>
            </ul>
        </section>
        <section class="module--input__R">
            <ul class="input--list">
                <li><button class="connection"></button></li>
                <li>Right</li>
            </ul>
        </section>
    </section>`
    mainContent.appendChild(section);
    const modules = document.querySelectorAll(".module");
    modules.forEach(e => {
        e.addEventListener("mousedown", makeItDragable);
    })
}