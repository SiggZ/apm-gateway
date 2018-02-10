import {Component, Input, OnInit} from '@angular/core';
import {Person, PersonService} from '../../entities/person';

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
    realPerson: Person;
    name: string;
    constructor(
        private personService: PersonService,
  ) {};
    parsePerson(persobj: any) {
           this.personService.find(persobj.personId).subscribe((pers) => {
                this.realPerson = pers;
                this.name = this.realPerson.name + ' ' + this.realPerson.surname;
            });
    }

    ngOnInit() {
            this.parsePerson(this.person);
    }
}
