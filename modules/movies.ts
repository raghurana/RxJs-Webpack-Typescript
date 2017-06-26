import {Logger} from './logger';

export default function fetchMovies() {

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(element => {
            Logger.log(element.title);
        });
        Logger.log("---");
    })

    xhr.open("GET", "./assets/movies.json");
    xhr.send();
}