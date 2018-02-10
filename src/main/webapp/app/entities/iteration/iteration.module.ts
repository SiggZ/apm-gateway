import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';


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
    IterationCopyDialogComponent,
    IterationCopyPopupComponent,
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
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        IterationComponent,
        IterationDetailComponent,
        IterationDialogComponent,
        IterationDeleteDialogComponent,
        IterationCopyDialogComponent,
        IterationCopyPopupComponent,
        IterationPopupComponent,
        IterationDeletePopupComponent,
    ],
    entryComponents: [
        IterationComponent,
        IterationDialogComponent,
        IterationPopupComponent,
        IterationCopyDialogComponent,
        IterationCopyPopupComponent,
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
