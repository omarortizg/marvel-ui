import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from './character/list/character-list.component';
import { CharacterDetailComponent } from './character/detail/character-detail.component';
import { ErrorComponent } from './error/error.component';

import { CharacterListResolver } from './character/list/character-list.resolver';
import { ComicListResolver } from './comic/list/comic-list.resolver';
import { StoryListResolver } from './story/list/story-list.resolver';
import { CharacterDetailResolver } from './character/detail/character-detail.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full'
    },
    {
        path: 'characters',
        component: CharacterListComponent,
        resolve: {
            characters: CharacterListResolver,
            comics: ComicListResolver,
            stories: StoryListResolver
        }
    },
    {
        path: 'characters/:id',
        component: CharacterDetailComponent,
        resolve: {
            character: CharacterDetailResolver
        }
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: 'characters'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        CharacterListResolver,
        ComicListResolver,
        StoryListResolver,
        CharacterDetailResolver
    ]
})
export class AppRoutingModule { }
