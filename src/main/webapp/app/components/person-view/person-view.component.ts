import {Component, Input, OnInit} from '@angular/core';
import {Person, PersonService} from '../../entities/person';
import {UserImageService} from "../../entities/person/user-image.service";

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
    personImage: any;
    constructor(
        private personService: PersonService,
        private userImageService: UserImageService,
  ) {};
    parsePerson(persobj: any) {
           this.personService.find(persobj.personId).subscribe((pers) => {
                this.realPerson = pers;
                this.name = this.realPerson.name;
                this.surname = this.realPerson.surname;
   /*             this.userImageService.find(this.realPerson.userImageData.imageId).subscribe( (img) => {
                    this.personImage = img;
                    console.log('the image is here ' + this.personImage);
                    }
                );*/
            });
           if (this.personImage === undefined) {
               this.personImage = '../../../content/images/person-placeholder.png';
           }
    }

    ngOnInit() {
            this.parsePerson(this.person);
    }
    onClick() {
        if (!this.disableAvailability) {
        }
    }
}
