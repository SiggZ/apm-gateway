import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import { Iteration, IterationService } from '../../entities/iteration';
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-all-sprints',
    templateUrl: './all-sprints.component.html'

})

export class AllSprintsComponent implements OnInit, OnDestroy {
    eventSubscriber: Subscription;
    iterations: Array<Iteration>;
    sprintId: any;
    constructor(
        private iterationService: IterationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {};
    ngOnInit(): void {
        this.initializeIterations();
        this.eventSubscriber = this.eventManager.subscribe('iterationListModification', (response) => {this.initializeIterations()})

    };
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    };
    // start date less than today and sort by date
    initializeIterations(): void {
        this.iterationService.query().subscribe(
            (res: ResponseWrapper) => {
                const unfilteredIterations = res.json;
                const currentDate = new Date();
                this.iterations = unfilteredIterations.filter((x) => currentDate >= x.start);
            },
                    (res: ResponseWrapper) => this.onError(res.json)
        );
    };

    private onError(error): void {
        this.jhiAlertService.error(error.message, null, null);
    };
}
