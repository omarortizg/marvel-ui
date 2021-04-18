import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StoryService {

    constructor(private http: HttpClient) { }

    public getAllStories(orderBy = '-modified'): Observable<any> {
        const params: any = {
            orderBy
        };

        return this.http.get<any>('stories', { params });
    }
}
