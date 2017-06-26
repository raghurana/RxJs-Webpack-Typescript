
import RunBasics from './modules/basics';
import FetchMovies from './modules/movies';
import { CircleDemo } from './modules/circledemo';

document
    .getElementById("button-run-basics")
    .addEventListener("click", e => RunBasics());

//-----------

document
    .getElementById("button-circle-tail")
    .addEventListener("click", onCircleDemoButtonClicked);

let circle     = document.getElementById("circle");
let circleDemo = new CircleDemo(circle);

function onCircleDemoButtonClicked(e: MouseEvent) {
    let sender     = e.srcElement as HTMLButtonElement;

    if (sender.value === "off") {   
        circle.style.visibility = "visible";
        sender.innerText        = "Stop circle demo";
        sender.value            = "on";

        circleDemo.startDemo(200);
    }
    else {
        circle.style.visibility = "hidden";
        sender.innerText        = "Start circle demo";
        sender.value            = "off";

        circleDemo.stopDemo();
    }
}

//-----------

document
    .getElementById("button-movies-fetch")
    .addEventListener("click", e => FetchMovies());

//-----------

