import { Observable, Observer } from 'rxjs';
import { Logger } from './logger';

export default function runBasics() {

    const completedString = "completed\n--------";

    let numbers = [1, 5, 10];
    let source = Observable.from(numbers);

    class MyObserver implements Observer<number> {
        next(data: number) {
            Logger.log(data);
        }

        error(e) {
            Logger.log(e);
        }

        complete() {
            Logger.log(completedString);
        }
    }

    // Using strongly type custom oberver:
    Logger.log("Using strongly typed observer...")
    source.subscribe(new MyObserver());

    // Using 3 NEC arrow functions
    Logger.log("Using NEC arrow functions...")
    source.subscribe(
        data => Logger.log(data),
        e => Logger.log(e),
        () => Logger.log(completedString));


    let source2 = Observable.create(observer => {
        for (let n of numbers) {
            if (n === 5)
                observer.error("Oops\n---");

            observer.next(n);
        }
        observer.complete();
    });

    Logger.log("using observable.create, with error condition...")
    source2.subscribe(
        data => Logger.log(data),
        e => Logger.log(e),
        () => Logger.log(completedString));

    let source3 = Observable.create(observer => {
        let index = 0;
        let produceValue = () => {
            observer.next(numbers[index++]);
            if (index < numbers.length)
                setTimeout(produceValue, 2000);
            else
                observer.complete();
        }

        produceValue();
    });

    Logger.log("using observable.create, with time delay...")
    source3.subscribe(
        data => Logger.log(data),
        e => Logger.log(e),
        () => Logger.log(completedString));

}