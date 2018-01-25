import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Person, PersonService } from '../../entities/person';

@Component({
    selector: 'jhi-person',
    templateUrl: './person-view.component.html',
    styleUrls: [
        './person-view.scss'
    ]
})
export class PersonViewComponent implements OnInit {
    @Input() person: any;
    @Input() imageSrc: string;
    realPerson: Person;
    name: string;
    constructor(
        private personService: PersonService,
  ) {};
    parsePerson(persobj: any) {
        this.personService.find(persobj.id).subscribe((pers) => {
            this.realPerson = pers;
            this.name = this.realPerson.name + ' ' + this.realPerson.surname;
            console.log("Person view " + this.name);
        });
    }

    ngOnInit() {
        this.parsePerson(this.person);
    }
}
