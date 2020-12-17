export {makeItDragable};

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

function makeItDragable(e) {
    if(e.target.dataset.dragable === "true") {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
}
function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    e.target.style.top = (e.target.offsetTop - pos2) + "px";
    e.target.style.left = (e.target.offsetLeft - pos1) + "px";
}
function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
}