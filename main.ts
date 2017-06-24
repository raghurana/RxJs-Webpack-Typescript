
import RunBasics from './modules/basics';

document
    .getElementById("button-run-basics")
    .addEventListener("click", e => RunBasics());

document
    .getElementById("button-circle-tail")
    .addEventListener("click", onCircleDemoButtonClicked);

let circle = 
    document
        .getElementById("circle");

function onCircleDemoButtonClicked(e: MouseEvent) {
    let sender = e.srcElement as HTMLButtonElement;
    if(sender.value === "off") {
        circle.style.visibility = "visible";
        sender.innerText = "Stop circle demo";
        sender.value = "on";
    }
    else {
        circle.style.visibility = "hidden";
        sender.innerText = "Start circle demo";
        sender.value = "off";
    }
}

/*

let bodyCircle = document.getElementById("circle");
let mouseMoveObservable = 
    Observable
        .fromEvent(document, "mousemove")
        .map((e: MouseEvent) => { return { x : e.clientX, y: e.clientY } })
        .filter(value => value.y > 100)
        .delay(200);

function onBodyMouseMove(mousePos) {
    bodyCircle.style.left = mousePos.x;
    bodyCircle.style.top = mousePos.y;
}

mouseMoveObservable.subscribe(
    onBodyMouseMove, 
    e => Logger.log(e), 
    () => Logger.log(completedString)); 
    
*/
