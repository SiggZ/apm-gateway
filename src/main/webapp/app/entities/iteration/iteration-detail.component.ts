import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Iteration } from './iteration.model';
import { IterationService } from './iteration.service';

@Component({
    selector: 'jhi-iteration-detail',
    templateUrl: './iteration-detail.component.html'
})
export class IterationDetailComponent implements OnInit, OnDestroy {

    iteration: Iteration;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private iterationService: IterationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIterations();
    }

    load(id) {
        this.iterationService.find(id).subscribe((iteration) => {
            this.iteration = iteration;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIterations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'iterationListModification',
            (response) => this.load(this.iteration.id)
        );
    }
}
