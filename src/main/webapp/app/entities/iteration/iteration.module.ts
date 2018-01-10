import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    IterationService,
    IterationPopupService,
    IterationComponent,
    IterationDetailComponent,
    IterationDialogComponent,
    IterationPopupComponent,
    IterationDeletePopupComponent,
    IterationDeleteDialogComponent,
    iterationRoute,
    iterationPopupRoute,
} from './';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const ENTITY_STATES = [
    ...iterationRoute,
    ...iterationPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        NgbModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IterationComponent,
        IterationDetailComponent,
        IterationDialogComponent,
        IterationDeleteDialogComponent,
        IterationPopupComponent,
        IterationDeletePopupComponent,
    ],
    entryComponents: [
        IterationComponent,
        IterationDialogComponent,
        IterationPopupComponent,
        IterationDeleteDialogComponent,
        IterationDeletePopupComponent,
    ],
    providers: [
        IterationService,
        IterationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayIterationModule {}
