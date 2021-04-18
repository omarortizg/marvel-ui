import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StoryService } from '../story.service';

@Injectable()
export class StoryListResolver implements Resolve<any> {

    constructor(
        private service: StoryService,
        private router: Router
    ) { }

    public resolve(): Observable<any> {
        return this.service.getAllStories()
            .pipe(
                catchError((error) => {
                    this.router.navigate(['error']);
                    return of(error);
                })
            );
    }
}
