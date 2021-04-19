import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { COMIC_ORDER_OPTIONS, COMIC_FORMAT_OPTIONS } from '../comic.constant';

import { ComicService } from '../comic.service';

@Component({
    selector: 'app-comic-list',
    templateUrl: './comic-list.component.html',
    styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {

    public itemList: any[] = [];
    public comicList: any[] = [];
    public orderByOptions = COMIC_ORDER_OPTIONS;
    public orderBy = this.orderByOptions[0].value;
    public formatOptions = COMIC_FORMAT_OPTIONS;
    public searchTerm = '';
    public format = '';
    public issueNumber: any;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService
    ) { }

    public ngOnInit(): void {
        this.updateData(this.route.snapshot.data.comics.results);
    }

    public search(): void {
        this.comicService.getAllComics(
                this.orderBy,
                this.searchTerm,
                this.format,
                this.issueNumber ? this.issueNumber.toString() : '')
            .subscribe((result) => {
                this.updateData(result.results);
            });
    }

    private updateData(comics: any[]): void {
        this.comicList = comics;
        this.itemList = this.comicList.map((item: any) => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail || { path: '/assets/no-image', extension: 'jpg' }
            };
        });
    }
}
