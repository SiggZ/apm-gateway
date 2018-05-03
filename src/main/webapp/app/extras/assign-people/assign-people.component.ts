import {Component, OnInit, OnDestroy, Input} from '@angular/core';
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
    @Input() team = new Team();
    @Input() sprint = new Iteration();
    selectedPeople: Array<Person> = new Array<Person>();
    people: Array<Person> = new Array<Person>();
    personSelectionControl: FormControl;
    velocityFormControl: FormControl;
    sprintTeam: SprintTeam = new SprintTeam();
    saveHasBeenPressed = false;
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
        this.sprintTeamForSprintAndTeam(this.sprint, this.team);

        this.personSelectionControl = new FormControl();
        this.personSelectionControl.valueChanges.subscribe((event: any) => {
            console.log('Person Selection made');
        });

        this.velocityFormControl = new FormControl();
    };

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    };

    initializePeople(): void {
        this.personService.query().subscribe(
            (res: ResponseWrapper) => this.onInitPeopleSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };
    onInitPeopleSuccess(people: Array<Person>): void {
        this.people = people;
    };

    public assignPeopleToSprintTeam() {
        var velocityFactor = this.sprintTeam.velocityFactor;
        if (this.sprint != null && this.team != null) {
            this.sprintTeamService.getBySprint(this.sprint.id).subscribe(
                (res: ResponseWrapper) => {
                    var sprintTeams = res.json;
                    if (sprintTeams != null && sprintTeams.length > 0) {
                        var filteredTeams = sprintTeams.filter((x) => (x.team.id === this.team.id));
                        if (filteredTeams != null && filteredTeams.length > 0) {
                            this.sprintTeam = filteredTeams[0];
                            this.sprintTeam.velocityFactor = velocityFactor;
                            this.updateExistingSprintTeam();
                        } else {
                            this.createSprintTeam();
                        }
                    } else {
                        this.createSprintTeam();
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }
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
            var currentSprintTeamPersons = this.sprintTeam.sprintTeamPersons;
            this.sprintTeam.sprintTeamPersons = new Array<any>();
            var sprintTeamPerson: any = null;
            for (var selectedPerson of this.selectedPeople) {
                 var sprintTeamPersonsFound = currentSprintTeamPersons.filter((x) => (x.personId === selectedPerson.id));
                if (sprintTeamPersonsFound != null && sprintTeamPersonsFound.length > 0) {
                    sprintTeamPerson = sprintTeamPersonsFound[0];

                } else {
                    sprintTeamPerson = {
                        personId: selectedPerson.id
                    }
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
       // this.jhiAlertService.error(error.message, null, null);
        console.log('There was an error ' + error);
    };

    clearSelectedPeople(): void {
        this.selectedPeople = new Array<Person>();
    };
/**
  Initializes the sprintTeam
  If the sprintTeam exists - updates the view with the information about the current sprint;
  If the sprintTeam doesn't exist - creates a new one
 **/
    sprintTeamForSprintAndTeam(sprint: Iteration, team: Team): void {
        if (this.sprint !== undefined && this.sprint != null && this.team !== undefined && this.team != null) {
            this.sprintTeamService.getBySprintAndTeam(this.sprint.id, this.team.id).subscribe(
                (response: SprintTeam) => {
                    this.sprintTeam = null;
                    this.sprintTeam = response;
                    if (this.sprintTeam != null && this.sprintTeam !== undefined) {
                        this.displayInformationForExistingSprintTeam();
                    } else {
                        this.prepareToCreateNewSprintTeam();
                    }
                },
                (response: SprintTeam) => this.onError(response)
            );
        }
    };

    /**
     Displays information for an existing sprintTeam.
     this.people is the GUI representation of all the people
     this.selectedPeople is the GUI representation of all the selectedPeople.
     The object should correspond. That's why existing elements are found in people and pushed to selected people.
     This is a hack but the GUI representation doesn't work if selectedPeople is assigned in another way.
     **/
    private displayInformationForExistingSprintTeam() {
        this.selectedPeople = new Array<Person>();
        if (this.sprintTeam != null && this.sprintTeam !== undefined && this.sprintTeam.sprintTeamPersons != null
            && this.sprintTeam.sprintTeamPersons !== undefined && this.sprintTeam.sprintTeamPersons.length > 0) {
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
