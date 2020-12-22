export {drawSvgLine, lineCounter};

let lineCounter = 1;

const svgContent = document.getElementById("svg--content");

function drawSvgLine (e) {
    const inputs = document.querySelectorAll(".connection--input");
    const outputs = document.querySelectorAll(".connection--output");
    let clickedElement = e.target.id;
    const svgPosition = svgContent.getBoundingClientRect();
    const existingLines = document.querySelectorAll("line");
    inputs.forEach(e => {
        e.removeEventListener("click", drawSvgLine);
    })
    outputs.forEach(e => {
        e.removeEventListener("click", drawSvgLine);
    })
    if(clickedElement.includes("input")) {
        if(existingLines.length === 0) {
            initLine();
            setTimeout(function() {window.addEventListener("click", finishSvgLineInput)}, 1000);
        } else {
            existingLines.forEach(f => {
                if(f.dataset.connections.includes(clickedElement)) {
                    const line = document.getElementById(f.id);
                    svgContent.removeChild(line);
                    initLine();
                    setTimeout(function() {window.addEventListener("click", finishSvgLineInput)}, 1000);
                } else {
                    initLine();
                    setTimeout(function() {window.addEventListener("click", finishSvgLineInput)}, 1000);
                }
            })
        }
    } else if(clickedElement.includes("output")) {
        initLine();
        setTimeout(function() {window.addEventListener("click", finishSvgLineOutput)}, 1000);
    }

    function initLine() {
        svgContent.innerHTML += `<line id="line${lineCounter}" class="svg--line" x1="${e.clientX}" y1="${e.clientY - svgPosition.y}" x2="${e.clientX + 10}" y2="${(e.clientY - svgPosition.y) + 10}" style="stroke:#eeeeee;stroke-width:2" data-connections="${clickedElement}"/>`
        window.addEventListener("mousemove", changeSvgLineDestination);
    }
}

function changeSvgLineDestination(f) {
    const line = document.getElementById(`line${lineCounter}`);
    const svgPosition = svgContent.getBoundingClientRect();
    line.setAttribute("x2", `${f.clientX}`);
    line.setAttribute("y2", `${f.clientY - svgPosition.y}`);
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
    } else if(preData.includes("oscilator") && preData.includes("input")) {
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
        if(g.target.id.includes("oscilator") && g.target.id.includes("input")) {
            const existingLines = document.querySelectorAll("line");
            existingLines.forEach(f => {
                if(f.dataset.connections.includes(g.target.id)) {
                    const line = document.getElementById(f.id);
                    svgContent.removeChild(line);
                }
            })
            preData += `//${g.target.id}`
            line.dataset.connections = preData;
            createLine();
        }
    } else if(preData.includes("oscilator")) {
        if(g.target.id === "audioR--input" || g.target.id === "audioL--input") {
            const existingLines = document.querySelectorAll("line");
            existingLines.forEach(f => {
                if(f.dataset.connections.includes(g.target.id)) {
                    const line = document.getElementById(f.id);
                    svgContent.removeChild(line);
                }
            })
            preData += `//${g.target.id}`
            line.dataset.connections = preData;
            createLine();
        }
    }
}

function createLine() {
    window.removeEventListener("mousemove", changeSvgLineDestination);
    window.removeEventListener("click", finishSvgLineOutput);
    window.removeEventListener("click", finishSvgLineInput);
    lineCounter++;
    const inputs = document.querySelectorAll(".connection--input");
    const outputs = document.querySelectorAll(".connection--output");
    setTimeout(function() {
        inputs.forEach(e => {
            e.addEventListener("click", drawSvgLine);
        })
        outputs.forEach(e => {
            e.addEventListener("click", drawSvgLine);
        })
    }, 200);
}
