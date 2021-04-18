import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CharacterService } from '../character.service';

@Injectable()
export class CharacterDetailResolver implements Resolve<any> {

    constructor(
        private service: CharacterService,
        private router: Router
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getCharacter(route.params.id)
            .pipe(
                catchError((error) => {
                    this.router.navigate(['error']);
                    return of(error);
                })
            );
    }
}
