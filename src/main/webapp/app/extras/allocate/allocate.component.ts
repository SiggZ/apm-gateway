import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { jqxListBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox';

@Component({
    selector: 'jhi-allocate',
    templateUrl: './allocate.component.html'
})
export class AllocateComponent implements AfterViewInit {
@ViewChild('jqxListBox') myListBox: jqxListBoxComponent;
@ViewChild('selectionLog') selectionLog: ElementRef;
    selectedTeams: string[];

    source: string[] =
        [
            'Team A',
            'Team B',
            'Team C',
            'Team D',
            'Team E',
            'Team F',
            'Team G',
            'Team H'
        ];
    dataAdapter: string = new jqx.dataAdapter(this.source);
    displaySelectedItems() {
        //  this.selectedTeams = this.myListBox.getSelectedItems();
        console.log('SelectedItems clicked');
    }

    ngAfterViewInit() {
        this.myListBox.selectIndex(2);
        this.myListBox.selectIndex(5);
        this.myListBox.selectIndex(7);
    }

}
