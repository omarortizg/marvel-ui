import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpConfigInterceptor } from './shared/http/http-config.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './character/list/character-list.component';
import { CharacterItemComponent } from './character/list/character-item/character-item.component';
import { ErrorComponent } from './error/error.component';
import { CharacterDetailComponent } from './character/detail/character-detail.component';
import { StoryNamePipe } from './story/story-name.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CharacterListComponent,
        CharacterItemComponent,
        CharacterDetailComponent,
        ErrorComponent,
        StoryNamePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbDropdownModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
