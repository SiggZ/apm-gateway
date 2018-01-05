import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent, ALLOCATE_ROUTE  } from './';
import {AllocateComponent} from '../extras/allocate/allocate.component';
import { jqxListBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot([ HOME_ROUTE, ALLOCATE_ROUTE], { useHash: true }),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        BrowserAnimationsModule
    ],
    declarations: [
        HomeComponent,
        jqxListBoxComponent,
        AllocateComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHomeModule {}
