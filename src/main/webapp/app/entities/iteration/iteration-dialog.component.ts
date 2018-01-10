import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Iteration } from './iteration.model';
import { IterationPopupService } from './iteration-popup.service';
import { IterationService } from './iteration.service';

@Component({
    selector: 'jhi-iteration-dialog',
    templateUrl: './iteration-dialog.component.html'
})
export class IterationDialogComponent implements OnInit {

    iteration: Iteration;
    isSaving: boolean;
    startDp: any;
    endDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private iterationService: IterationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.iteration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.iterationService.update(this.iteration));
        } else {
            this.subscribeToSaveResponse(
                this.iterationService.create(this.iteration));
        }
    }

    private subscribeToSaveResponse(result: Observable<Iteration>) {
        result.subscribe((res: Iteration) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Iteration) {
        this.eventManager.broadcast({ name: 'iterationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-iteration-popup',
    template: ''
})
export class IterationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private iterationPopupService: IterationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.iterationPopupService
                    .open(IterationDialogComponent as Component, params['id']);
            } else {
                this.iterationPopupService
                    .open(IterationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
