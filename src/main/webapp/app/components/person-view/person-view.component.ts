import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Person} from '../../entities/person/person.model';
@Component({
    selector: 'jhi-person',
    templateUrl: './person-view.component.html'
})
export class PersonViewComponent {
    @Input() person: Person;
    @Input() imageSrc: string;

}
