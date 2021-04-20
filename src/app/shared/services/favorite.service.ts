import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    private refreshFavorites$: Subject<void> = new Subject<void>();

    public refreshFavorites(): void {
        this.refreshFavorites$.next();
    }

    public onRefreshFavorites(): Observable<void> {
        return this.refreshFavorites$.asObservable();
    }

    public getFavorites(): string[] {
        return this.getFavoritesFromStorage();
    }

    public removeFavorite(viewName: string, id: string): boolean {
        const favorites = this.getFavoritesFromStorage();
        const idxToRemove = favorites.indexOf(`${viewName}-${id}`);
        if (idxToRemove >= 0) {
            favorites.splice(idxToRemove, 1);
            localStorage.setItem('marvelFavorites', JSON.stringify(favorites));
            return false;
        }

        return true;
    }

    public saveFavorite(viewName: string, id: string): boolean {
        const favorites = this.getFavoritesFromStorage();
        const idx = favorites.indexOf(`${viewName}-${id}`);
        if (idx === -1) {
            favorites.push(`${viewName}-${id}`);
            localStorage.setItem('marvelFavorites', JSON.stringify(favorites));
            return true;
        }

        return false;
    }

    private getFavoritesFromStorage(): string[] {
        const favoritesString = localStorage.getItem('marvelFavorites');
        return favoritesString ? JSON.parse(favoritesString) : [];
    }
}
