import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ComicService {

    constructor(private http: HttpClient) { }

    public getAllComics(orderBy = 'focDate'): Observable<any> {
        const params: any = {
            orderBy
        };

        return this.http.get<any>('comics', { params });
    }
}
