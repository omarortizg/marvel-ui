import { NgModule } from '@angular/core';

import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    exports: [
        NgbDropdownModule,
        NgbCollapseModule
    ]
})
export class NgBootstrapModule { }
