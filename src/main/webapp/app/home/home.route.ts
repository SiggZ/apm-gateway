import { Route } from '@angular/router';

import { HomeComponent } from './';
import {AllocateComponent} from '../extras/allocate/allocate.component';
import {PeopleAvailabilityComponent} from '../extras/people-availability/people-availability.component';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome to Zulu!'
    }
};
export const ALLOCATE_ROUTE: Route = {
    path: 'plan-sprint',
    component: AllocateComponent,
    data: {
        authorities: [],
        pageTitle: 'Sprint Planning'
    }
};

export const DISPLAY_PEOPLE_AVAILABILITY: Route = {
    path: 'people-availability',
    component: PeopleAvailabilityComponent,
    data: {
        authorities: [],
        pageTitle: 'People Availability'
    }
};
