import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';

import { ResponseWrapper } from '../../shared';
import { Team, TeamService } from '../../entities/team';
import { Person, PersonService } from '../../entities/person';
import { SprintTeam, SprintTeamService } from '../sprint-team'

@Component({
    selector: 'jhi-assign-people',
    templateUrl: './assign-people.component.html'
})
export class AssignPeopleComponent implements OnInit, OnDestroy {
    eventSubscriber: Subscription;
    selectedPeople: Array<Person>;
    teams: Array<Team>;
    people: Array<Person>;
    personSelectionControl: FormControl;

    constructor(
        private teamService: TeamService,
        private PersonService: PersonService,
        private sprintTeamService: SprintTeamService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {};

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('teamListModification', (response) => {})
    };

    ngOnInit(): void {


        this.registerChangeInTeams();
        this.personSelectionControl = new FormControl();
        this.personSelectionControl.valueChanges.subscribe((event: any) => {
            console.log('Person Selection made');
        });
    };

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    };


    // create SprintTeam entities for the selected teams in the sprint
}

