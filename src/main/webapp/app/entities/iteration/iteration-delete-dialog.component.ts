import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Iteration } from './iteration.model';
import { IterationPopupService } from './iteration-popup.service';
import { IterationService } from './iteration.service';

@Component({
    selector: 'jhi-iteration-delete-dialog',
    templateUrl: './iteration-delete-dialog.component.html'
})
export class IterationDeleteDialogComponent {

    iteration: Iteration;

    constructor(
        private iterationService: IterationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.iterationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'iterationListModification',
                content: 'Deleted an iteration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-iteration-delete-popup',
    template: ''
})
export class IterationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private iterationPopupService: IterationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.iterationPopupService
                .open(IterationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
