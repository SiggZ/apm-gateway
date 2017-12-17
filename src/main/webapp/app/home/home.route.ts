import { Route } from '@angular/router';

import { HomeComponent } from './';
import {AllocateComponent} from '../extras/allocate/allocate.component';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome to Zulu!'
    }
};
export const ALLOCATE_ROUTE: Route = {
    path: 'allocate',
    component: AllocateComponent,
    data: {
        authorities: [],
        pageTitle: 'Allocation Page'
    }
};
