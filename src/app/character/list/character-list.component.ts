import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CharacterService, CHARACTER_ORDER_OPTIONS } from '../character.service';

@Component({
    selector: 'app-character-list',
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

    public characterList: any;
    public comicList: any;
    public storyList: any;
    public orderByOptions = CHARACTER_ORDER_OPTIONS;
    public orderBy = this.orderByOptions[0].value;
    public searchTerm = '';
    public selectedComics: number[] = [];
    public selectedStories: number[] = [];

    constructor(
        private route: ActivatedRoute,
        private characterService: CharacterService
    ) { }

    public ngOnInit(): void {
        this.characterList = this.route.snapshot.data.characters.results;
        this.comicList = this.route.snapshot.data.comics.results;
        this.storyList = this.route.snapshot.data.stories.results;
    }

    public search(): void {
        this.characterService.getAllCharacters(this.orderBy, this.searchTerm, this.selectedComics, this.selectedStories)
            .subscribe((result) => {
                this.characterList = result.results;
            });
    }

    public onComicChange(isChecked: boolean, comicId: number): void {
        if (isChecked) {
            this.selectedComics.push(comicId);
        } else {
            const idxToRemove = this.selectedComics.indexOf(comicId);
            if (idxToRemove >= 0) {
                this.selectedComics.splice(idxToRemove, 1);
            }
        }

        this.search();
    }

    public onStoryChange(isChecked: boolean, storyId: number): void {
        if (isChecked) {
            this.selectedStories.push(storyId);
        } else {
            const idxToRemove = this.selectedStories.indexOf(storyId);
            if (idxToRemove >= 0) {
                this.selectedStories.splice(idxToRemove, 1);
            }
        }

        this.search();
    }

    public fetchData(character: any, opened: boolean): void {
        if (opened) {
            console.log(character);
            console.log(opened);
        }
    }
}
