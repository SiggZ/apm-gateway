import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent, ALLOCATE_ROUTE,ASSIGN_PEOPLE_ROUTE, DISPLAY_PEOPLE_AVAILABILITY  } from './';
import {AllocateComponent} from '../extras/allocate/allocate.component';
import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatOptionModule,
    MatSelectModule, MatListModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TeamOverviewComponent} from '../components/team-overview/team-overview.component';
import {PersonViewComponent} from '../components/person-view/person-view.component';
import {SprintOverviewComponent} from '../components/sprint-overview/sprint-overview.component';
import {AllSprintsComponent} from '../components/all-sprints/all-sprints.component';
import {PeopleAvailabilityComponent} from '../extras/people-availability/people-availability.component';
import {AssignPeopleComponent} from '../extras/assign-people/assign-people.component';

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot([ HOME_ROUTE, ALLOCATE_ROUTE, ASSIGN_PEOPLE_ROUTE, DISPLAY_PEOPLE_AVAILABILITY], { useHash: true }),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatListModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        HomeComponent,
        AllocateComponent,
        AssignPeopleComponent,
        SprintOverviewComponent,
        TeamOverviewComponent,
        PersonViewComponent,
        PeopleAvailabilityComponent,
        AllSprintsComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHomeModule {}
