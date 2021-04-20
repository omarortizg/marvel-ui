import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private loadingStatus$: Subject<boolean> = new Subject<boolean>();

    public isLoading(loading: boolean): void {
        this.loadingStatus$.next(loading);
    }

    public onLoading(): Observable<boolean> {
        return this.loadingStatus$.asObservable();
    }
}
