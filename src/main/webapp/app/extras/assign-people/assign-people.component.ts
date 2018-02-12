import {Component, OnInit, OnDestroy, AfterContentChecked} from '@angular/core';
import { FormControl } from '@angular/forms';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { ResponseWrapper } from '../../shared';
import { Team, TeamService } from '../../entities/team';
import { Person, PersonService } from '../../entities/person';
import { SprintTeam, SprintTeamService } from '../sprint-team'
import {Iteration, IterationService} from '../../entities/iteration/';

@Component({
    selector: 'jhi-assign-people',
    templateUrl: './assign-people.component.html',
    styleUrls: [
        './assign-people.scss'
    ]
})
export class AssignPeopleComponent implements OnInit, OnDestroy {
    eventSubscriber: Subscription;
    team = new Team();
    sprint = new Iteration();
    selectedPeople: Array<Person> = new Array<Person>();
    people: Array<Person>;
    personSelectionControl: FormControl;
    sprintTeam: SprintTeam = new SprintTeam();
    private subscription: Subscription;

    constructor(
        private teamService: TeamService,
        private iterationService: IterationService,
        private personService: PersonService,
        private sprintTeamService: SprintTeamService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
    ) {};

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('personListModification', (response) => {})
    };

    ngOnInit(): void {
        this.initializePeople ();
        this.registerChangeInTeams();
        this.subscription = this.route.params.subscribe((params) => {
            this.sprintLoad(params['sprintId']);
            this.teamLoad(params['teamId']);
            this.sprintTeamsForSprint(params['sprintId'], params['teamId']);
        });

        this.personSelectionControl = new FormControl();
        this.personSelectionControl.valueChanges.subscribe((event: any) => {
            console.log('Person Selection made');
        });
    };

    sprintLoad(id) {
        this.iterationService.find(id).subscribe((sprint) => {
            this.sprint = sprint;
        });
    }
    teamLoad(id) {
        this.teamService.find(id).subscribe((team) => {
            this.team = team;
        });
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.subscription.unsubscribe();
    };

    initializePeople(): void {
        this.personService.query().subscribe(
            (res: ResponseWrapper) => this.onInitPeopleSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };
    onInitPeopleSuccess(people: Array<Person>): void {
        this.people = people;
        this.updateSelectionForPeopleAlreadyInTeam();
    };

    assignPeopleToSprintTeam() {
        if (this.sprintTeam.id != null) {
            this.updateExistingSprintTeam();
        } else {
            this.createSprintTeam();
        }
    };

    removePersonClicked(person: Person) {
        var index = this.selectedPeople.indexOf(person);
        var  selectedPeopleWithoutPerson = this.selectedPeople;
        selectedPeopleWithoutPerson.splice(index, 1);
        this.selectedPeople = new Array<Person>();
        for (person of selectedPeopleWithoutPerson) {
            this.selectedPeople.push(person);
        }
    };
    private updateExistingSprintTeam() {
        if (this.sprintTeam != null ) {
        this.sprintTeam.sprintTeamPersons = new Array<any>();
        for (var selectedPerson of this.selectedPeople) {
                var sprintTeamPerson: any = {
                    personId:  selectedPerson.id
                }
                this.sprintTeam.sprintTeamPersons.push(sprintTeamPerson);
        }

        this.sprintTeamService.update(this.sprintTeam).subscribe(
            (response: SprintTeam) => console.log('Successfully updated SprintTeam for '),
            (error: any) => console.log('Failed to update SprintTeam: ') )// TODO: handle errors?

        }
        };

    private createSprintTeam() {
        this.sprintTeam.sprintTeamPersons = new Array<any>();
        for (var selectedPerson of this.selectedPeople) {
            var sprintTeamPerson: any = {
                personId:  selectedPerson.id
            }
            this.sprintTeam.sprintTeamPersons.push(sprintTeamPerson);
        }
        this.sprintTeamService.create(this.sprintTeam).subscribe(
            (response: SprintTeam) => console.log('Successfully created SprintTeam for ' + response.team.name),
            (error: any) => console.log('Failed to create SprintTeam: ' + error) // TODO: handle errors?
        );

    }

    private onError(error): void {
        this.jhiAlertService.error(error.message, null, null);
    };

    clearSelectedPeople(): void {
        this.selectedPeople = new Array<Person>();
    };

    sprintTeamsForSprint(sprintId: any, teamId: any): void {
        console.log('Sprint Team for Sprint and Team ');
        this.sprintTeamService.getBySprint(sprintId).subscribe(
            (res: ResponseWrapper) => {
                var sprintTeams = res.json;
                if (sprintTeams != null && sprintTeams.length > 0) {
                    var filteredTeams = sprintTeams.filter((x) => (x.team.id === teamId));
                    if (filteredTeams != null && filteredTeams.length > 0) {
                        this.sprintTeam = filteredTeams[0];
                        this.updateSelectionForPeopleAlreadyInTeam();
                    } else {
                        this.prepareToCreateNewSprintTeam();
                    }
                } else {
                    this.prepareToCreateNewSprintTeam();
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };
    private updateSelectionForPeopleAlreadyInTeam() {
        this.selectedPeople = new Array<Person>();
        if (this.sprintTeam != null && this.sprintTeam !== undefined && this.sprintTeam.sprintTeamPersons != null) {
            const spTeamPersonIds = this.sprintTeam.sprintTeamPersons.map((x) => x.personId);
            for (var person of this.people) {
                if (spTeamPersonIds.indexOf(person.id) > -1 ) {
                    this.selectedPeople.push(person);
                }
            }
        }
    }

    private prepareToCreateNewSprintTeam() {
        this.sprintTeam.id = null;
        this.sprintTeam.team = this.team;
        this.sprintTeam.sprint = this.sprint;
        this.sprintTeam.sprintTeamPersons = new Array<any>();
    }

    previousScreen() {
        window.history.back();
    }

}
