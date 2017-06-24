
import { Observable, Subscription } from 'rxjs';
import { Logger } from './logger';

export class CircleDemo {

    private mouseMoveSubscription: Subscription;

    startDemo(circleElement: HTMLElement, delayInMills: number) {
        this.mouseMoveSubscription =
            Observable
                .fromEvent(document, "mousemove")
                .map((e: MouseEvent) => { return new MousePoition(e.clientX, e.clientY) })
                .filter(value => value.Y > 100)
                .delay(delayInMills)
                .subscribe(e => this.onBodyMouseMove(circleElement, e), e => Logger.log(e), () => Logger.log("complete"));
    }

    stopDemo() {
        this.mouseMoveSubscription.unsubscribe();
    }

    private onBodyMouseMove(circle: HTMLElement, position: MousePoition) {           
        circle.style.left = position.X;
        circle.style.top = position.Y;
        Logger.log(JSON.stringify(position));
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