// JavaScript source code
var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}
pdfjsLib.getDocument("./Monster_Hunter_4.pdf").then((pdf) => {

    myState.pdf = pdf;
    render();

});

function render() {
    myState.pdf.getPage(myState.currentPage).then((page) => {

        var canvas = document.getElementById("pdf_renderer");
        var ctx = canvas.getContext('2d');

        var viewport = page.getViewport(myState.zoom);

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}

document.getElementById('go_previous').addEventListener('click', (e) => {
    if (myState.pdf == null || myState.currentPage == 1)
        return;
    myState.currentPage -= 1;
    document.getElementById("current_page").value = myState.currentPage;
    render();
});

document.getElementById('go_next').addEventListener('click', (e) => {
    if (myState.pdf == null || myState.currentPage > myState.pdf._pdfInfo.numPages)
        return;
    myState.currentPage += 1;
    document.getElementById("current_page").value = myState.currentPage;
    render();
});

document.getElementById('current_page').addEventListener('keypress', (e) => {
    if (myState.pdf == null) return;

    // Get key code
    var code = (e.keyCode ? e.keyCode : e.which);

    // If key code matches that of the Enter key
    if (code == 13) {
        var desiredPage =
            document.getElementById('current_page').valueAsNumber;

        if (desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages) {
            myState.currentPage = desiredPage;
            document.getElementById("current_page").value = desiredPage;
            render();
        }
    }

});

document.getElementById('zoom_in').addEventListener('click', (e) => {
    if (myState.pdf == null) return;
    myState.zoom += 0.2;
    render();
});

document.getElementById('zoom_out').addEventListener('click', (e) => {
    if (myState.pdf == null) return;
    myState.zoom -= 0.2;
    render();
});

//------------------------ACTUAL PDF-----------------------//

//----------------------PAINT---------------------------//

// JavaScript source code
var colour = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

// When clicking on colours items
$(".controls").on("click", "li", function () {
    //  Deselect aibling elements
    $(this).siblings().removeClass("selected");
    //  Select clicked element
    $(this).addClass("selected");
    // Cache current colour
    colour = $(this).css("background-color");

});

// On mouse events on the canvas
$canvas.mousedown(function (e) {
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    // Draw lines
    if (mouseDown) {
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX + 5, e.offsetY + 10);
        context.lineTo(e.offsetX + 10, e.offsetY - 20);
        context.strokeStyle = colour;
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.stroke();
        lastEvent = e;
        mouseDown = false;

    }
}).mouseup(function () {
    mouseDown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});

// Clear the canvas when button is clicked
function clear_canvas_width() {
    var s = document.getElementById("pdf_renderer");
    var w = s.width;
    s.width = 10;
    s.width = w;
}