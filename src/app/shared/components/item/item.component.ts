import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    @Input()
    public item: any;

    @Input()
    public path = '';
}
