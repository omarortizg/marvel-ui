import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CharacterService } from '../character.service';
import { CHARACTER_ORDER_OPTIONS } from '../character.constant';

@Component({
    selector: 'app-character-list',
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

    public itemList: any[] = [];
    public comicList: any = [];
    public storyList: any = [];
    public orderByOptions = CHARACTER_ORDER_OPTIONS;
    public orderBy = this.orderByOptions[0].value;
    public searchTerm = '';
    public selectedComics: number[] = [];
    public selectedStories: number[] = [];
    private characterList: any[] = [];
    private offset = 0;
    private isFetching = false;

    constructor(
        private route: ActivatedRoute,
        private characterService: CharacterService
    ) { }

    public ngOnInit(): void {
        this.updateData(this.route.snapshot.data.characters);
        this.comicList = this.route.snapshot.data.comics;
        this.storyList = this.route.snapshot.data.stories;
    }

    public search(): void {
        this.offset = 0;
        this.fetchCharacters();
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

    public onScroll(): void {
        if (!this.isFetching) {
            this.isFetching = true;
            this.offset += 20;
            this.fetchCharacters(this.characterList);
        }
    }

    private fetchCharacters(currentCharacterList: any[] = []): void {
        this.characterService.getAllCharacters(this.orderBy, this.searchTerm, this.selectedComics, this.selectedStories, this.offset)
            .subscribe((result) => {
                if (result.length) {
                    this.isFetching = false;
                }
                this.updateData(currentCharacterList.concat(result));
            });
    }

    private updateData(characters: any[]): void {
        this.characterList = characters;
        this.itemList = this.characterList.map((item: any) => {
            return {
                id: item.id,
                title: item.name,
                description: item.description,
                thumbnail: item.thumbnail || { path: '/assets/no-image', extension: 'jpg' }
            };
        });
    }
}
