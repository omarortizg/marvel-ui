import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { COMIC_ORDER_OPTIONS } from './comic.constant';

@Injectable({
    providedIn: 'root'
})
export class ComicService {

    constructor(private http: HttpClient) { }

    public getAllComics(
        orderBy = COMIC_ORDER_OPTIONS[0].value,
        titleStartsWith = '',
        format = '',
        issueNumber = ''
    ): Observable<any> {
        const params: any = {
            orderBy
        };
        if (titleStartsWith) {
            params.titleStartsWith = titleStartsWith;
        }
        if (format) {
            params.format = format;
        }
        if (issueNumber) {
            params.issueNumber = issueNumber;
        }

        return this.http.get<any>('comics', { params });
    }

    public getComic(id: number): Observable<any> {
        return this.http.get<any>(`comics/${id}`)
            .pipe(
                map((response) => response.results[0])
            );
    }
}
