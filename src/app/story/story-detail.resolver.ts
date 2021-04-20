import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StoryNamePipe } from 'src/app/story/story-name.pipe';

import { StoryService } from './story.service';

@Injectable()
export class StoryDetailResolver implements Resolve<any> {

    constructor(
        private service: StoryService,
        private router: Router,
        private storyNamePipe: StoryNamePipe
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getStory(route.params.id)
            .pipe(
                map((response) => {
                    return {
                        title: this.storyNamePipe.transform(response.title),
                        thumbnail: response.thumbnail || { path: '/assets/no-image', extension: 'jpg' },
                        description: response.description,
                        collectionList: [
                            {
                                name: 'Characters',
                                path: '/characters',
                                itemList: response.characters.items
                            },
                            {
                                name: 'Comics',
                                path: '/comics',
                                itemList: response.comics.items
                            }
                        ]
                    };
                }),
                catchError((error) => {
                    this.router.navigate(['error']);
                    return of(error);
                })
            );
    }
}
