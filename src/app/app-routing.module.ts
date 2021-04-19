import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from './character/list/character-list.component';
import { ComicListComponent } from './comic/list/comic-list.component';
import { StoryListComponent } from './story/list/story-list.component';
import { ErrorComponent } from './error/error.component';

import { CharacterListResolver } from './character/list/character-list.resolver';
import { ComicListResolver } from './comic/list/comic-list.resolver';
import { StoryListResolver } from './story/list/story-list.resolver';
import { CharacterDetailResolver } from './character/character-detail.resolver';
import { ComicDetailResolver } from './comic/comic-detail.resolver';
import { DetailComponent } from './shared/components/detail/detail.component';

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
        component: DetailComponent,
        resolve: {
            detail: CharacterDetailResolver
        },
        data: {
            list1: 'Comics',
            list2: 'Stories'
        }
    },
    {
        path: 'comics',
        component: ComicListComponent,
        resolve: {
            comics: ComicListResolver
        }
    },
    {
        path: 'comics/:id',
        component: DetailComponent,
        resolve: {
            detail: ComicDetailResolver
        },
        data: {
            list1: 'Characters',
            list2: 'Stories'
        }
    },
    {
        path: 'stories',
        component: StoryListComponent,
        resolve: {
            stories: StoryListResolver
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
        CharacterDetailResolver,
        ComicDetailResolver
    ]
})
export class AppRoutingModule { }
