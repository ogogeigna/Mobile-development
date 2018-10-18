// 自定义component， 可以复用
// html => <app-touch-event>

import { Component } from "../../node_modules/@angular/core";


@Component({
    selector: 'app-touch-event',
    template: `
        <div class="gestures"
             (click)="onElementClicked()">
          Click me
        </div>

        <div class="gestures"
             (tap)="onElementTapped()">
          Tap me
        </div>

        <div class="gestures"
             (press)="onElementPressed()"
             (click)="onElementClicked()">
          Long press me
        </div>
    `
})

// inject only into the declarations of app.component

export class TouchEventComponent {

}