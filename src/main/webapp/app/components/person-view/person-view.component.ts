import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Person, PersonService } from '../../entities/person';
import {isNullOrUndefined} from "util";

@Component({
    selector: 'jhi-person',
    templateUrl: './person-view.component.html',
    styleUrls: [
        './person-view.scss'
    ]
})
export class PersonViewComponent implements OnInit {
    @Input() person = {personId: null};
    @Input() imageSrc: string;
    @Input() disableAvailability = true;

    realPerson: Person;
    name: string;
    surname: string;
    constructor(
        private personService: PersonService,
  ) {};
    parsePerson(persobj: any) {
           this.personService.find(persobj.personId).subscribe((pers) => {
                this.realPerson = pers;
                this.name = this.realPerson.name;
                this.surname = this.realPerson.surname;
            });
    }

    ngOnInit() {
            this.parsePerson(this.person);
    }
    onClick() {
        if (!this.disableAvailability) {
        }
    }
}
