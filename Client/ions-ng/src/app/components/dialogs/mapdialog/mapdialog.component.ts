import { Component, OnInit, Inject } from '@angular/core';
import { LocationService } from '../../../services';

@Component({
  selector: 'ions-mapdialog',
  templateUrl: './mapdialog.component.html',
  styleUrls: ['./mapdialog.component.scss']
})
export class MapdialogComponent implements OnInit {
address:string;
  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
   
  }

getAddress(){
  this.address=this.locationService.getAddress();
  console.log(this.address);
}
}
