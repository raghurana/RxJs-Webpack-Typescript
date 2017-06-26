
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
                .map((e: MouseEvent) => { return new MousePoition(e.clientX, e.clientY) })
                .filter(value => value.Y > 100)
                .delay(delayInMills)
                .subscribe(
                    e => this.onBodyMouseMove(e), 
                    e => Logger.log(e), 
                    () => Logger.log("complete"));
    }

    stopDemo() {
        this.mouseMoveSubscription.unsubscribe();
    }

    private onBodyMouseMove(position: MousePoition) {       
        Logger.log(JSON.stringify(position));
        this.circleElement.style.left = position.X;
        this.circleElement.style.top = position.Y;
    }
}

class MousePoition {
    private x: any;
    private y: any;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }
} 