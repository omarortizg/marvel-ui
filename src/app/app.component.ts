import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FavoriteService } from './shared/services/favorite.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    public isCollapsed = true;
    public favorites: string[] = [];

    private ngUnsubscribe = new Subject<void>();

    constructor(
        private router: Router,
        private favoriteService: FavoriteService
    ) { }

    public ngOnInit(): void {
        this.favorites = this.favoriteService.getFavorites();

        this.favoriteService.onRefreshFavorites()
            .pipe(
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(() => {
                this.favorites = this.favoriteService.getFavorites();
            });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public toFavorite(favorite: string): void {
        const favoriteParams = favorite.split('-');
        this.router.navigate([`/${favoriteParams[0]}`, favoriteParams[1]], { replaceUrl: true });
    }
}
