/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { IterationDetailComponent } from '../../../../../../main/webapp/app/entities/iteration/iteration-detail.component';
import { IterationService } from '../../../../../../main/webapp/app/entities/iteration/iteration.service';
import { Iteration } from '../../../../../../main/webapp/app/entities/iteration/iteration.model';

describe('Component Tests', () => {

    describe('Iteration Management Detail Component', () => {
        let comp: IterationDetailComponent;
        let fixture: ComponentFixture<IterationDetailComponent>;
        let service: IterationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [IterationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    IterationService,
                    JhiEventManager
                ]
            }).overrideTemplate(IterationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IterationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IterationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Iteration('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.iteration).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
