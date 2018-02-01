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
import {UserMgmtDeleteDialogComponent} from '../../admin/user-management/user-management-delete-dialog.component';

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

    constructor(
        private jhiAlertService: JhiAlertService,
        private personService: PersonService,
        private route: ActivatedRoute,
        private userModalService: UserModalService,
        private router: Router
    ) {};
    ngOnInit(): void {
    };
}
