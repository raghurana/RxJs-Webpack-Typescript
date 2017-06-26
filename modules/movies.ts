import { Logger } from './logger';
import { Observable } from 'rxjs';

export class MovieFetcher {

    static showMovies(url: string) {
        this.getMovies(url)
            .subscribe(this.logMovies);
    }

    private static getMovies(url: string) {
        return Observable.create(observer => {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load",
                () => {
                    observer.next(JSON.parse(xhr.responseText));
                    observer.complete();
                });

            xhr.open("GET", url);
            xhr.send();
        });
    }

    private static logMovies(movies: any) {
        movies.forEach(element => {
            Logger.log(element.title);
        });
        Logger.log("---");
    }
}
