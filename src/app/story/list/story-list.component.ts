import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryNamePipe } from '../story-name.pipe';

import { StoryService } from '../story.service';

@Component({
    selector: 'app-story-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

    public itemList: any[] = [];
    public storyList: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private storyService: StoryService,
        private storyNamePipe: StoryNamePipe
    ) { }

    public ngOnInit(): void {
        this.updateData(this.route.snapshot.data.stories.results);
    }

    public search(): void {
        this.storyService.getAllStories()
            .subscribe((result) => {
                this.updateData(result.results);
            });
    }

    private updateData(stories: any[]): void {
        this.storyList = stories;
        this.itemList = this.storyList.map((item: any) => {
            return {
                id: item.id,
                title: this.storyNamePipe.transform(item.title),
                description: item.description,
                thumbnail: item.thumbnail || { path: '/assets/no-image', extension: 'jpg' }
            };
        });
    }
}
