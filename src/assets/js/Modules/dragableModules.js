export {addDraggableListeners};

function addDraggableListeners(elementSelector) {
    var dragStartX, dragStartY;
    var dragStartXLine, dragStartYLine;
    var objInitLeft, objInitTop;
    var lineInitX, lineInitY;
    var line;
    var arrayOfLines = []
    var inDrag = false;
    var dragTarget = document.querySelector(`#${elementSelector}`);
    dragTarget.addEventListener("mousedown", function (e) {
        if(dragTarget.id === "audioOutput") {
            let existingLines = document.querySelectorAll("line");
            existingLines.forEach(el => {
                if(el.dataset.connections.includes("audio")) {
                    let connectionsArray = el.dataset.connections.split("//");
                    if(connectionsArray[0].includes("audio")) {
                        line = document.getElementById(`${el.id}`);
                        createObjectToDragLine(e, 1);
                    }else if(connectionsArray[1].includes("audio")) {
                        line = document.getElementById(`${el.id}`);
                        createObjectToDragLine(e, 2);
                    }
                }
            })
        } else if(dragTarget.id.includes("oscilator")) {
            let existingLines = document.querySelectorAll("line");
            existingLines.forEach(el => {
                if(el.dataset.connections.includes(dragTarget.id)) {
                    let connectionsArray = el.dataset.connections.split("//");
                    if(connectionsArray[0].includes("oscilator")) {
                        line = document.getElementById(`${el.id}`);
                        createObjectToDragLine(e, 1);
                    }else if(connectionsArray[1].includes("oscilator")) {
                        line = document.getElementById(`${el.id}`);
                        createObjectToDragLine(e, 2);
                    }
                }
            })
        } else if(dragTarget.id.includes("potenciometer")) {
            let existingLines = document.querySelectorAll("line");
            existingLines.forEach(el => {
                if(el.dataset.connections.includes(dragTarget.id)) {
                    let connectionsArray = el.dataset.connections.split("//");
                    if(connectionsArray[0].includes("potenciometer")) {
                        line = document.getElementById(`${el.id}`);
                        createObjectToDragLine(e, 1);
                    }else if(connectionsArray[1].includes("potenciometer")) {
                        line = document.getElementById(`${el.id}`);
                        createObjectToDragLine(e, 2);
                    }
                }
            })
        }
        inDrag = true;
        objInitLeft = dragTarget.offsetLeft;
        objInitTop = dragTarget.offsetTop;
        dragStartX = e.pageX;
        dragStartY = e.pageY;
    });
    document.addEventListener("mousemove", function (e) {
        if (!inDrag) {
            return;
        }
        dragTarget.style.left = objInitLeft + e.pageX - dragStartX + "px";
        dragTarget.style.top = objInitTop + e.pageY - dragStartY + "px";
    });
    document.addEventListener("mouseup", function (e) {
        if(e.target.id.includes("audio")) {
            if(arrayOfLines.length !== 0) {
                arrayOfLines.forEach(f => {
                    let line = document.getElementById(f.line);
                    let connectionsArray = line.dataset.connections.split("//");
                    if(connectionsArray[0].includes("audio")) {
                        dragLine(e, f, 1);
                    } else if(connectionsArray[1].includes("audio")) {
                        dragLine(e, f, 2);
                    }
                })
                arrayOfLines = [];
            }
        } else if(e.target.id.includes("oscilator")) {
            if(arrayOfLines.length !== 0) {
                arrayOfLines.forEach(f => {
                    let line = document.getElementById(f.line);
                    let connectionsArray = line.dataset.connections.split("//");
                    if(connectionsArray[0].includes(e.target.id)) {
                        dragLine(e, f, 1);
                    } else if(connectionsArray[1].includes(e.target.id)) {
                        dragLine(e, f, 2);
                    }
                })
                arrayOfLines = [];
            }
        } else if(e.target.id.includes("potenciometer")) {
            if(arrayOfLines.length !== 0) {
                arrayOfLines.forEach(f => {
                    let line = document.getElementById(f.line);
                    let connectionsArray = line.dataset.connections.split("//");
                    if(connectionsArray[0].includes(e.target.id)) {
                        dragLine(e, f, 1);
                    } else if(connectionsArray[1].includes(e.target.id)) {
                        dragLine(e, f, 2);
                    }
                })
                arrayOfLines = [];
            }
        }
        inDrag = false;
    });
    function createObjectToDragLine(e, f) {
        inDrag = true;
        objInitLeft = dragTarget.offsetLeft;
        objInitTop = dragTarget.offsetTop;
        dragStartX = e.pageX;
        dragStartY = e.pageY;
        dragStartXLine = e.clientX;
        dragStartYLine = e.clientY;
        lineInitX = line.getAttribute(`x${f}`);
        lineInitY = line.getAttribute(`y${f}`);
        let finalPositionObject = {
            "line": line.id,
            "dragStartX": dragStartXLine,
            "dragStartY": dragStartYLine,
            "lineInitX": lineInitX,
            "lineInitY": lineInitY
        }
        arrayOfLines.push(finalPositionObject);
    }
    function dragLine(e, f, g) {
        const lineToChange = document.getElementById(f.line);
        let diferenceX = e.clientX - f.dragStartX;
        let diferenceY = e.clientY - f.dragStartY;
        let finalX = parseInt(f.lineInitX, 10) + diferenceX;
        let finalY = parseInt(f.lineInitY, 10) + diferenceY;
        lineToChange.setAttribute(`x${g}`, `${finalX}`);
        lineToChange.setAttribute(`y${g}`, `${finalY}`);
    }
}
