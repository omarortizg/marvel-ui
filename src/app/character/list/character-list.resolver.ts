import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CharacterService } from '../character.service';

@Injectable()
export class CharacterListResolver implements Resolve<any> {

    constructor(
        private service: CharacterService,
        private router: Router
    ) { }

    public resolve(): Observable<any> {
        return this.service.getAllCharacters()
            .pipe(
                catchError((error) => {
                    this.router.navigate(['error']);
                    return of(error);
                })
            );
    }
}
