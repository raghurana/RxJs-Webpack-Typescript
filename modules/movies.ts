import { Logger } from './logger';
import { Observable } from 'rxjs';

export class MovieFetcher {

    static showMovies(url: string) {
        this.getMoviesObservable(url)
            .retryWhen(this.retryStrategy({}))
            .subscribe(this.logMovies, Logger.log);
    }

    private static getMoviesObservable(url: string) {
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
        });
    }

    private static logMovies(movies: any) {
        movies.forEach(element => {
            Logger.log(element.title);
        });
        Logger.log("---");
    }

    private static retryStrategy({ noOfTries = 4, delayInMills = 500 }) {
        return function(errors: Observable<any>) {
            return errors
                    .scan((acc, value) =>  {
                        if(++acc === noOfTries) 
                            throw value;
                        return acc;
                    }, 0)
                    .delay(delayInMills);
        }
    }
}
