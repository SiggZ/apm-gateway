import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Iteration } from './iteration.model';
import { IterationService } from './iteration.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-iteration',
    templateUrl: './iteration.component.html'
})
export class IterationComponent implements OnInit, OnDestroy {
iterations: Iteration[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private iterationService: IterationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.iterationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.iterations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIterations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Iteration) {
        return item.id;
    }
    registerChangeInIterations() {
        this.eventSubscriber = this.eventManager.subscribe('iterationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
