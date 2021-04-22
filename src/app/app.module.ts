import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { HttpConfigInterceptor } from './shared/http/http-config.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { NgBootstrapModule } from './shared/modules/ng-bootstrap.module';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './character/list/character-list.component';
import { ErrorComponent } from './error/error.component';
import { ComicListComponent } from './comic/list/comic-list.component';
import { StoryListComponent } from './story/list/story-list.component';
import { ItemComponent } from './shared/components/item/item.component';
import { DetailComponent } from './shared/components/detail/detail.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { StoryNamePipe } from './story/story-name.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CharacterListComponent,
        ComicListComponent,
        StoryListComponent,
        ItemComponent,
        DetailComponent,
        LoadingComponent,
        ErrorComponent,
        StoryNamePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgBootstrapModule,
        InfiniteScrollModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
        StoryNamePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
