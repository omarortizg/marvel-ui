import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ComicService } from '../comic.service';

@Injectable()
export class ComicListResolver implements Resolve<any> {

    constructor(
        private service: ComicService,
        private router: Router
    ) { }

    public resolve(): Observable<any> {
        return this.service.getAllComics()
            .pipe(
                catchError((error) => {
                    this.router.navigate(['error']);
                    return of(error);
                })
            );
    }
}
