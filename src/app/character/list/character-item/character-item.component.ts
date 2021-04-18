import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-character-item',
    templateUrl: './character-item.component.html',
    styleUrls: ['./character-item.component.scss']
})
export class CharacterItemComponent {

    @Input()
    public character: any;
}
