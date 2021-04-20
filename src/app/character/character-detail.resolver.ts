import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StoryNamePipe } from 'src/app/story/story-name.pipe';

import { CharacterService } from './character.service';

@Injectable()
export class CharacterDetailResolver implements Resolve<any> {

    constructor(
        private service: CharacterService,
        private router: Router,
        private storyNamePipe: StoryNamePipe
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getCharacter(route.params.id)
            .pipe(
                map((response) => {
                    return {
                        title: response.name,
                        thumbnail: response.thumbnail || { path: '/assets/no-image', extension: 'jpg' },
                        description: response.description,
                        collectionList: [
                            {
                                name: 'Comics',
                                path: '/comics',
                                itemList: response.comics.items
                            },
                            {
                                name: 'Stories',
                                path: '/stories',
                                itemList: response.stories.items.map((item: any) => {
                                    item.name = this.storyNamePipe.transform(item.name);
                                    return item;
                                })
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
