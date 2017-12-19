import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent, ALLOCATE_ROUTE  } from './';
import {AllocateComponent} from '../extras/allocate/allocate.component';
import {MultiselectModule} from 'ngx-multiselect';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot([ HOME_ROUTE, ALLOCATE_ROUTE], { useHash: true }),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MultiselectModule.forRoot()

    ],
    declarations: [
        HomeComponent,
        AllocateComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHomeModule {}
