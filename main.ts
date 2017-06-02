
import { Observable, Observer } from 'rxjs';

let numbers = [1, 5, 10];
let source  = Observable.create(observer => {

    for(let n of numbers) {
        if(n === 5) 
            observer.error("Bad value 5");

        observer.next(n);    
    }

    observer.complete();
})

class MyObserver implements Observer<number>  {
    
    next(val){
        console.log(`value: ${val}`);        
    }

    error(e) {
        console.log(`error: ${e}`);
    }

    complete() {
        console.log("complete");
    }

}

source.subscribe(new MyObserver());
source.subscribe(
    val => console.log(`value from arrow func: ${val}`),
    e => console.log(`error from arrow func: ${e}`),
    () => console.log("complete from arrow func")
);