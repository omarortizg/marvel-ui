import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'app-loading',
    styleUrls: ['./loading.component.scss'],
    templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit, OnDestroy {

    public isLoading = false;

    private ngUnsubscribe = new Subject<void>();

    constructor(private loading: LoadingService) { }

    public ngOnInit(): void {
        this.loading.onLoading()
            .pipe(
                debounceTime(500)
            )
            .subscribe((isLoading) => {
                this.isLoading = isLoading;
            });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
