
import RunBasics from './modules/basics';
import { CircleDemo } from './modules/circledemo';

document
    .getElementById("button-run-basics")
    .addEventListener("click", e => RunBasics());

let circle = document.getElementById("circle");
let circleDemo = new CircleDemo(circle);

document
    .getElementById("button-circle-tail")
    .addEventListener("click", onCircleDemoButtonClicked);

function onCircleDemoButtonClicked(e: MouseEvent) {
    let sender = e.srcElement as HTMLButtonElement;
    if (sender.value === "off") {   
        circle.style.visibility = "visible";
        sender.innerText = "Stop circle demo";
        sender.value = "on";

        circleDemo.startDemo(200);
    }
    else {
        circle.style.visibility = "hidden";
        sender.innerText = "Start circle demo";
        sender.value = "off";

        circleDemo.stopDemo();
    }
}


