import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import { Iteration, IterationService } from '../../entities/iteration';
import { SprintTeam, SprintTeamService } from '../../extras/sprint-team'
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-all-sprints',
    templateUrl: './all-sprints.component.html'

})

export class AllSprintsComponent implements OnInit {
    eventSubscriber: Subscription;
    iterations: Array<Iteration>;
    constructor(
        private iterationService: IterationService,
        private jhiAlertService: JhiAlertService,
    ) {};
    ngOnInit(): void {
        this.initializeIterations();
    };
    // start date less than today and sort by date
    initializeIterations(): void {
        this.iterationService.query().subscribe(
            (res: ResponseWrapper) => this.iterations = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    };
    private onError(error): void {
        this.jhiAlertService.error(error.message, null, null);
    };
}
