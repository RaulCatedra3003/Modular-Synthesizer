export {addDraggableListeners};

function addDraggableListeners(elementSelector) {
    var dragStartX, dragStartY;
    var objInitLeft, objInitTop;
    var inDrag = false;
    var dragTarget = document.querySelector(`#${elementSelector}`);
    dragTarget.addEventListener("mousedown", function (e) {
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
        inDrag = false;
    });
}
