import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FavoriteService } from '../../services/favorite.service';
import { ItemDetail } from './detail';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    public detail!: ItemDetail;
    public viewName = '';
    public isFavorite = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private favoriteService: FavoriteService
    ) { }

    public ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.detail = this.route.snapshot.data.detail;
        this.viewName = this.route.snapshot.data.viewName;
        const favorites = this.favoriteService.getFavorites();
        const idx = favorites.indexOf(`${this.viewName}-${this.route.snapshot.params.id}`);
        this.isFavorite = idx >= 0;
    }

    public favorite(): void {
        if (this.isFavorite) {
            this.isFavorite = this.favoriteService.removeFavorite(this.viewName, this.route.snapshot.params.id);
        } else {
            this.isFavorite = this.favoriteService.saveFavorite(this.viewName, this.route.snapshot.params.id);
        }
        this.favoriteService.refreshFavorites();
    }

    public getIdFromPath(resourceUrl: string): string {
        const fromIdx = resourceUrl.lastIndexOf('/');
        const toIdx = resourceUrl.indexOf('?');
        if (fromIdx >= 0 && toIdx >= 0) {
            return resourceUrl.substring(fromIdx + 1, toIdx - 1);
        }

        return resourceUrl.substring(fromIdx + 1);
    }
}
