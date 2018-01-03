import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent, ALLOCATE_ROUTE  } from './';
import {AllocateComponent} from '../extras/allocate/allocate.component';
import { jqxListBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox';
import {MdButtonModule} from '@angular/material';

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot([ HOME_ROUTE, ALLOCATE_ROUTE], { useHash: true }),
        MdButtonModule
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
