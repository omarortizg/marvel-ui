import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const CHARACTER_ORDER_OPTIONS = [
    {
        name: 'A-Z',
        value: 'name'
    },
    {
        name: 'Z-A',
        value: '-name'
    }
];

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    constructor(private http: HttpClient) { }

    public getAllCharacters(
        orderBy = 'name',
        nameStartsWith = '',
        selectedComics: number[] = [],
        selectedStories: number[] = []
    ): Observable<any> {
        const params: any = {
            orderBy
        };
        if (nameStartsWith) {
            params.nameStartsWith = nameStartsWith;
        }
        if (selectedComics.length > 0) {
            params.comics = selectedComics.join(',');
        }
        if (selectedStories.length > 0) {
            params.stories = selectedStories.join(',');
        }

        return this.http.get<any>('characters', { params });
    }

    public getCharacter(id: number): Observable<any> {
        return this.http.get<any>(`characters/${id}`)
            .pipe(
                map((response) => response.results[0])
            );
    }
}
