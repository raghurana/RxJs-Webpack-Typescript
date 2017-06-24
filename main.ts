
import {Observable, Observer} from 'rxjs';

const completedString = "completed\r\n--------";

let numbers = [1, 5, 10];
let source = Observable.from(numbers);

class MyObserver implements Observer<number> {
    next(data: number) {
        console.log(data);
    }

    error(e) {
        console.log(e);
    }

    complete() {
        console.log(completedString); 
    }
}

// Using strongly type custom oberver:
console.log("Using strongly typed observer...")
source.subscribe(new MyObserver());

// Using 3 NEC arrow functions
console.log("Using NEC arrow functions...") 
source.subscribe(
    data => console.log(data), 
    e => console.log(e), 
    () => console.log(completedString));


let source2 = Observable.create(observer => {
    for(let n of numbers) { 
        if(n === 5)
            observer.error("Oops\r\n---");

       observer.next(n);
    }
    observer.complete();
});

console.log("using observable.create, with error condition...")
source2.subscribe(
    data => console.log(data), 
    e => console.log(e), 
    () => console.log(completedString));

let source3 = Observable.create(observer => {
    let index = 0;
    let produceValue = () => {  
        observer.next(numbers[index++]);
        if(index < numbers.length)
            setTimeout(produceValue, 2000);
        else
            observer.complete();        
    }

    produceValue();
});

console.log("using observable.create, with time delay...")
source3.subscribe(
    data => console.log(data), 
    e => console.log(e), 
    () => console.log(completedString));