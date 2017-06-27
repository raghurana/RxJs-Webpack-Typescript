import { Logger } from './logger';
import { Observable } from 'rxjs';

export class MovieFetcher {

    static showMovies(url: string) {
        this.getMovies(url)
            .subscribe(this.logMovies, Logger.log);
    }

    private static getMovies(url: string) {
        return Observable.create(observer => {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load",
                () => {
                        if(xhr.status === 200) {
                        observer.next(JSON.parse(xhr.responseText));
                        observer.complete();
                    } else {
                        observer.error(xhr.statusText);
                    }
                });

            xhr.open("GET", url);
            xhr.send();
        }).retryWhen(this.retryStrategy({ noOfTries: 3, delayInMills: 1000 }));
    }

    private static logMovies(movies: any) {
        movies.forEach(element => {
            Logger.log(element.title);
        });
        Logger.log("---");
    }

    private static retryStrategy({ noOfTries = 4, delayInMills = 500 }) {
        return function(errors) {
            return errors
                    .scan((acc, value) => acc + 1, 0)
                    .takeWhile(acc => acc < noOfTries)
                    .delay(delayInMills);
        }
    }
}
