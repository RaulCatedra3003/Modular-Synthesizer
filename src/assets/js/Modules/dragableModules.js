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
        if(dragTarget.id === "audioOutput") {
            const existingLines = document.querySelectorAll("line");
            existingLines.forEach(el => {
                if(el.dataset.connections.includes("audio")) {
                    let connectionsArray = el.dataset.connections;
                    connectionsArray = connectionsArray.split("//");
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
                console.log(arrayOfLines);
                arrayOfLines.forEach(f => {
                    const lineToSee = document.getElementById(f.line);
                    let connectionsArray = lineToSee.dataset.connections.split("//");
                    if(connectionsArray[0].includes("audio")) {
                        console.log("aqui");
                        const lineToChange = document.getElementById(f.line);
                        let diferenceX = e.clientX - dragStartX;
                        let finalX = parseInt(lineInitX, 10) + diferenceX;
                        let diferenceY = e.clientY - dragStartY;
                        let finalY = parseInt(lineInitY, 10) + diferenceY;
                        lineToChange.x1 = `${finalX}`;
                        lineToChange.y1 = `${finalY}`;
                    } else if(connectionsArray[1].includes("audio")) {
                        console.log("aqui2");
                        const lineToChange = document.getElementById(f.line);
                        let diferenceX = e.clientX - dragStartX;
                        let finalX = parseInt(lineInitX, 10) + diferenceX;
                        let diferenceY = e.clientY - dragStartY;
                        let finalY = parseInt(lineInitY, 10) + diferenceY;
                        lineToChange.setAttribute("x2", `${finalX}`);
                        lineToChange.setAttribute("y2", `${finalY}`);
                        console.log("aqui 3");
                    }
                })
            }
        arrayOfLines = [];
        }
        inDrag = false;
    });
}
