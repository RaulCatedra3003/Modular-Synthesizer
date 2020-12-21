export {drawSvgLine};

let lineCounter = 1;

const svgContent = document.getElementById("svg--content");

function drawSvgLine (e) {
    const clickedElement = e.target.classList;
    const inputs = document.querySelectorAll(".connection--input");
    const outputs = document.querySelectorAll(".connection--output");
    inputs.forEach(e => {
        e.removeEventListener("click", drawSvgLine);
    })
    outputs.forEach(e => {
        e.removeEventListener("click", drawSvgLine);
    })
    clickedElement.forEach(element => {
        if(element.includes("input")) {
            const svgPosition = svgContent.getBoundingClientRect();
            svgContent.innerHTML += `<line id="line${lineCounter}" class="svg--line" x1="${e.clientX}" y1="${e.clientY - svgPosition.y}" x2="${e.clientX + 10}" y2="${(e.clientY - svgPosition.y) + 10}" style="stroke:#eeeeee;stroke-width:2" data-connections="${e.target.id}"/>`
            window.addEventListener("mousemove", changeSvgLineDestination);
            setTimeout(function() {window.addEventListener("click", finishSvgLineInput)}, 1000);
        } else if(element.includes("output")) {
            const svgPosition = svgContent.getBoundingClientRect();
            svgContent.innerHTML += `<line id="line${lineCounter}" class="svg--line" x1="${e.clientX}" y1="${e.clientY - svgPosition.y}" x2="${e.clientX + 10}" y2="${(e.clientY - svgPosition.y) + 10}" style="stroke:#eeeeee;stroke-width:2" data-connections="${e.target.id}"/>`
            window.addEventListener("mousemove", changeSvgLineDestination);
            setTimeout(function() {window.addEventListener("click", finishSvgLineOutput)}, 1000);
        }
    })
}

function changeSvgLineDestination(f) {
    const line = document.getElementById(`line${lineCounter}`);
    const svgPosition = svgContent.getBoundingClientRect();
    line.setAttribute("x2", `${f.pageX}`);
    line.setAttribute("y2", `${f.pageY - svgPosition.y}`);
}

function finishSvgLineInput(g) {
    const line = document.getElementById(`line${lineCounter}`);
    let preData = line.dataset.connections;
    if(preData.includes("audio")) {
        if(g.target.id.includes("oscilator") && g.target.id.includes("output")) {
            preData += `//${g.target.id}`
            line.dataset.connections = preData;
            createLine();
        }
    } else if(preData.includes("oscilator") && preData.includes("frequency")) {
        if(g.target.id.includes("potenciometer") && g.target.id.includes("output")) {
            preData += `//${g.target.id}`
            line.dataset.connections = preData;
            createLine();
        }
    }
}

function finishSvgLineOutput(g) {
    const line = document.getElementById(`line${lineCounter}`);
    let preData = line.dataset.connections;
    if(preData.includes("potenciometer")) {
        if(g.target.id.includes("frequency")) {
            preData += `//${g.target.id}`
            line.dataset.connections = preData;
            createLine();
        }
    } else if(preData.includes("oscilator")) {
        if(g.target.id === "audioR" || g.target.id === "audioL") {
            preData += `//${g.target.id}`
            line.dataset.connections = preData;
            createLine();
        }
    }
}

function createLine() {
    window.removeEventListener("mousemove", changeSvgLineDestination);
    window.removeEventListener("click", finishSvgLineOutput);
    lineCounter++;
    const inputs = document.querySelectorAll(".connection--input");
    const outputs = document.querySelectorAll(".connection--output");
    inputs.forEach(e => {
        e.addEventListener("click", drawSvgLine);
    })
    outputs.forEach(e => {
        e.addEventListener("click", drawSvgLine);
    })
}