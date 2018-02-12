import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import { Team, TeamService } from '../../entities/team';
import { Person, PersonService } from '../../entities/person';
import { Iteration, IterationService } from '../../entities/iteration';
import { SprintTeam, SprintTeamService } from '../../extras/sprint-team'
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModalService} from '../../admin/user-management/user-modal.service';
import { ResponseWrapper } from '../../shared';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-people-availability',
    templateUrl: './people-availability.component.html',
    styleUrls: [
        './people-availability.scss'
    ]
})

export class PeopleAvailabilityComponent implements OnInit {
    @Input() sprintTeam: SprintTeam;
    people: Array<Person>;
    routeSub: any;
    modalRef: NgbModalRef;
    datePipe: DatePipe;
    listOfDays: Array<Date>;
    testDate: Array<Date> = new Array<Date>();
    calenderColumns = 1; // hardcoded to be changed later
    constructor(
        private jhiAlertService: JhiAlertService,
        private personService: PersonService,
        private iterationService: IterationService,
        private route: ActivatedRoute,
        private userModalService: UserModalService,
        private router: Router
    ) {};

    ngOnInit(): void {
        const dateFormat = 'yyyy-MM-dd';
        this.datePipe = new DatePipe('en');
        this.iterationService.getListOfDaysForSprint(this.sprintTeam.sprint.id).subscribe(
            (res: ResponseWrapper) => {
                this.listOfDays = res.json.map((x) => this.datePipe.transform(x, dateFormat));
                this.calenderColumns = this.listOfDays.length;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };

    // the other way around
    personAvailableOnDay(day: Date, availDays: Array<Date>): boolean {
        if (availDays.indexOf(day) >= 0) {
            return true;
        }else {
            return false;
        }
    };

    private onError(error): void {
        this.jhiAlertService.error(error.message, null, null);
    };

}
