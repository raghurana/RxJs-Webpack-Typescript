
import { Observable, Subscription } from 'rxjs';
import { Logger } from './logger';

export class CircleDemo {

    private circleElement: HTMLElement;
    private mouseMoveSubscription: Subscription;   

    constructor(circleElement: HTMLElement) {
        this.circleElement = circleElement;
    }

    startDemo(delayInMills: number) {        
        this.mouseMoveSubscription =
            Observable
                .fromEvent(document, "mousemove")
                .map((e: MouseEvent) => { return { x: e.clientX, y: e.clientY } })
                .filter(value => value.y > 100)
                .delay(delayInMills)
                .subscribe(
                    e => this.onBodyMouseMove(e), 
                    e => Logger.log(e), 
                    () => Logger.log("complete"));
    }

    stopDemo() {
        this.mouseMoveSubscription.unsubscribe();
    }

    private onBodyMouseMove(position) {       
        Logger.log(JSON.stringify(position));
        
        this.circleElement.style.left = position.x;
        this.circleElement.style.top  = position.y;
    }
}
