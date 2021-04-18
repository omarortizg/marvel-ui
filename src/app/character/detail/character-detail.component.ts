import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

    public character: any;

    constructor(
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.character = this.route.snapshot.data.character;
        console.log(this.character);
    }
}
