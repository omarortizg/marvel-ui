import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StoryNamePipe } from '../story/story-name.pipe';

import { ComicService } from './comic.service';

@Injectable()
export class ComicDetailResolver implements Resolve<any> {

    constructor(
        private service: ComicService,
        private router: Router,
        private storyNamePipe: StoryNamePipe
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getComic(route.params.id)
            .pipe(
                map((response) => {
                    return {
                        title: response.title,
                        thumbnail: response.thumbnail,
                        description: response.description,
                        list1: response.characters.items,
                        list2: response.stories.items.map((item: any) => {
                            item.name = this.storyNamePipe.transform(item.name);
                            return item;
                        })
                    };
                }),
                catchError((error) => {
                    this.router.navigate(['error']);
                    return of(error);
                })
            );
    }
}
