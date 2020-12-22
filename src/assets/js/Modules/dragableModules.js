export {addDraggableListeners};

function addDraggableListeners(elementSelector) {
    var dragStartX, dragStartY;
    var objInitLeft, objInitTop;
    var lineInitX, lineInitY;
    var line;
    var arrayOfLines = []
    var inDrag = false;
    var dragTarget = document.querySelector(`#${elementSelector}`);
    dragTarget.addEventListener("mousedown", function (e) {
        e.stopPropagation();
        if(dragTarget.id === "audioOutput") {
            let existingLines = document.querySelectorAll("line");
            existingLines.forEach(el => {
                if(el.dataset.connections.includes("audio")) {
                    let connectionsArray = el.dataset.connections.split("//");
                    if(connectionsArray[0].includes("audio")) {
                        line = document.getElementById(`${el.id}`);
                        inDrag = true;
                        objInitLeft = dragTarget.offsetLeft;
                        objInitTop = dragTarget.offsetTop;
                        dragStartX = e.pageX;
                        dragStartY = e.pageY;
                        lineInitX = line.getAttribute("x1");
                        lineInitY = line.getAttribute("y1");
                        let finalPositionObject = {
                            "line": line.id,
                            "dragStartX": dragStartX,
                            "dragStartY": dragStartY,
                            "lineInitX": lineInitX,
                            "lineInitY": lineInitY
                        }
                        arrayOfLines.push(finalPositionObject);
                    }else if(connectionsArray[1].includes("audio")) {
                        line = document.getElementById(`${el.id}`);
                        inDrag = true;
                        objInitLeft = dragTarget.offsetLeft;
                        objInitTop = dragTarget.offsetTop;
                        dragStartX = e.pageX;
                        dragStartY = e.pageY;
                        lineInitX = line.getAttribute("x2");
                        lineInitY = line.getAttribute("y2");
                        let finalPositionObject = {
                            "line": line.id,
                            "dragStartX": dragStartX,
                            "dragStartY": dragStartY,
                            "lineInitX": lineInitX,
                            "lineInitY": lineInitY
                        }
                        arrayOfLines.push(finalPositionObject);
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
                        const lineToChange = document.getElementById(f.line);
                        let diferenceX = e.clientX - f.dragStartX;
                        let diferenceY = e.clientY - f.dragStartY;
                        let finalX = parseInt(f.lineInitX, 10) + diferenceX;
                        let finalY = parseInt(f.lineInitY, 10) + diferenceY;
                        lineToChange.setAttribute("x1", `${finalX}`);
                        lineToChange.setAttribute("y1", `${finalY}`);
                    } else if(connectionsArray[1].includes("audio")) {
                        const lineToChange = document.getElementById(f.line);
                        let diferenceX = e.clientX - f.dragStartX;
                        let diferenceY = e.clientY - f.dragStartY;
                        let finalX = parseInt(f.lineInitX, 10) + diferenceX;
                        let finalY = parseInt(f.lineInitY, 10) + diferenceY;
                        lineToChange.setAttribute("x2", `${finalX}`);
                        lineToChange.setAttribute("y2", `${finalY}`);
                    }
                })
                arrayOfLines = [];
            }
        }
        inDrag = false;
    });
}
