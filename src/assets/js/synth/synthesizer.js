export {arrayOfModules, startSound};

var arrayOfModules = [];
var arrayOfLines = [];
let idsToLook = [];

const playButton = document.getElementById("play");

function startSound() {
    playButton.removeEventListener("click", startSound);
    if(arrayOfModules.length === 0) {
        alert("Yo need to create the modules")
    } else {
        const lines = document.querySelectorAll("line");
        if(lines.length === 0) {
            alert("You have to connect the modules");
        } else {
            lines.forEach(e => {
                arrayOfLines.push(e.dataset.connections.split("//"));
            })
            arrayOfLines.forEach(el => {
                el.forEach(g => {
                    if(g.includes("potenciometer")) {
                        idsToLook.push(el);
                    }
                })
            })
            arrayOfLines.forEach(el => {
                el.forEach(g => {
                    if(g.includes("potenciometer")) {
                        idsToLook.push(el);
                    }
                })
                if(el.includes("audioL--input")) {
                    let position = el.indexOf("audioL--input");
                    if(position === 0) {
                        let idToLook = el[1].split("--");
                        idToLook = idToLook[0];
                        let modulePositionInArray;
                        let moduleToConnectPositionInArray;
                        for(let i = 0; i < arrayOfModules.length; i++) {
                            if(arrayOfModules[i].id === idToLook) {
                                modulePositionInArray = i;
                            }
                            if(arrayOfModules[i].id === "audioOutput") {
                                moduleToConnectPositionInArray = i;
                            }
                        }
                        arrayOfModules[modulePositionInArray].module.connect(arrayOfModules[moduleToConnectPositionInArray].pannerL);
                    } else if(position === 1) {
                        let idToLook = el[0].split("--");
                        idToLook = idToLook[0];
                        let modulePositionInArray;
                        let moduleToConnectPositionInArray;
                        for(let i = 0; i < arrayOfModules.length; i++) {
                            if(arrayOfModules[i].id === idToLook) {
                                modulePositionInArray = i;
                            }
                            if(arrayOfModules[i].id === "audioOutput") {
                                moduleToConnectPositionInArray = i;
                            }
                        }
                        arrayOfModules[modulePositionInArray].module.connect(arrayOfModules[moduleToConnectPositionInArray].pannerL);
                    }
                } else if(el.includes("audioR--input")) {
                    let position = el.indexOf("audioR--input");
                    if(position === 0) {
                        let idToLook = el[1].split("--");
                        idToLook = idToLook[0];
                        let modulePositionInArray;
                        let moduleToConnectPositionInArray;
                        for(let i = 0; i < arrayOfModules.length; i++) {
                            if(arrayOfModules[i].id === idToLook) {
                                modulePositionInArray = i;
                            }
                            if(arrayOfModules[i].id === "audioOutput") {
                                moduleToConnectPositionInArray = i;
                            }
                        }
                        arrayOfModules[modulePositionInArray].module.connect(arrayOfModules[moduleToConnectPositionInArray].pannerR);
                    } else if(position === 1) {
                        let idToLook = el[0].split("--");
                        idToLook = idToLook[0];
                        let modulePositionInArray;
                        let moduleToConnectPositionInArray;
                        for(let i = 0; i < arrayOfModules.length; i++) {
                            if(arrayOfModules[i].id === idToLook) {
                                modulePositionInArray = i;
                            }
                            if(arrayOfModules[i].id === "audioOutput") {
                                moduleToConnectPositionInArray = i;
                            }
                        }
                        arrayOfModules[modulePositionInArray].module.connect(arrayOfModules[moduleToConnectPositionInArray].pannerR);
                    }
                } else if(idsToLook !== []) {
                    let position;
                    for(let i = 0; i < el.length; i++) {
                        if(el[i].includes("potenciometer")) {
                            position = i;
                        }
                    }
                    if(position === 0) {
                        let oscilatorPosition;
                        let oscilatorId = el[1].split("--");
                        oscilatorId = oscilatorId[0];
                        let potenciometerId = el[0].split("--");
                        potenciometerId = potenciometerId[0];
                        const frequencyInput = document.getElementById(`${potenciometerId}--input`);
                        for(let i = 0; i < arrayOfModules.length; i++) {
                            if(arrayOfModules[i].id === oscilatorId) {
                                oscilatorPosition = i;
                            }
                        }
                        frequencyInput.addEventListener("input", function(){ajustFrequencyValue(oscilatorPosition)});
                    } else if(position === 1) {
                        let oscilatorPosition;
                        let oscilatorId = el[0].split("--");
                        oscilatorId = oscilatorId[0];
                        let potenciometerId = el[1].split("--");
                        potenciometerId = potenciometerId[0];
                        const frequencyInput = document.getElementById(`${potenciometerId}--input`);
                        for(let i = 0; i < arrayOfModules.length; i++) {
                            if(arrayOfModules[i].id === oscilatorId) {
                                oscilatorPosition = i;
                            }
                        }
                        frequencyInput.addEventListener("input", function(){ajustFrequencyValue(oscilatorPosition)});
                    }
                }
            })
            let moduleToConnectPositionInArray;
            let arrayOfOscilators = [];
            for(let i = 0; i < arrayOfModules.length; i++) {
                if(arrayOfModules[i].id === "audioOutput") {
                    moduleToConnectPositionInArray = i;
                }
                if(arrayOfModules[i].id.includes("oscilator")) {
                    arrayOfOscilators.push(i);
                }
            }
            if(moduleToConnectPositionInArray === undefined) {
                alert("you need to create audio output");
            } else {
                arrayOfModules[moduleToConnectPositionInArray].dConnect;
                arrayOfOscilators.forEach(e => {
                    arrayOfModules[e].module.start();
                })
                playButton.textContent = "Stop";
                playButton.addEventListener("click", stopSound);
                arrayOfLines = [];
            }
        }
    }
}

function stopSound() {
    playButton.removeEventListener("click", stopSound);
    let arrayOfOscilators = [];
    for(let i = 0; i < arrayOfModules.length; i++) {
        if(arrayOfModules[i].id.includes("oscilator")) {
            arrayOfOscilators.push(i);
        }
    }
    arrayOfOscilators.forEach(e => {
        arrayOfModules[e].module.stop();
        arrayOfModules[e].module = arrayOfModules[e].context.createOscillator();
        arrayOfModules[e].changeWave;
        arrayOfModules[e].changeFrequency;
    })
    idsToLook = [];
    playButton.textContent = "Play";
    playButton.addEventListener("click", startSound);
}

function ajustFrequencyValue(oscilatorPosition) {
    var evento = window.event;
    arrayOfModules[oscilatorPosition].frequency = evento.target.value;
    arrayOfModules[oscilatorPosition].module.frequency.value = evento.target.value;
}