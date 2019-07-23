import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocationService, HomeApiService } from 'src/app/services';
import { MatDialog } from '@angular/material';
import { MapdialogComponent } from '../../../dialogs/mapdialog/mapdialog.component';

@Component({
  selector: 'ions-profile-homeinfo',
  templateUrl: './homeinfo.component.html',
  styleUrls: ['./homeinfo.component.scss']
})
export class HomeinfoComponent implements OnInit {
  public home: Home;
  public countryList = [];
  public cityList = [];
  public address = "";
  public homeInfoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private homeApiService: HomeApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.home = {
      name: '',
      township: '',
      country: '',
      city: '',
      address: ''
    }
    this.initHomeInfoForm();
  }

  public updateHome() {
    this.homeApiService.updateHome(this.home)
      .subscribe(user => {
        if (user) {
          console.log(user);
        }
      }, err => {
        console.log('Error');
        alert("Fail");
      });
  }
  public onCountrySelected() {
    this.cityList = this.locationService.getCityList(this.home.country);
  }

  private initHomeInfoForm() {
    this.countryList = this.locationService.getCountryList();
    this.cityList = this.locationService.getCityList(this.countryList[0]);

    this.homeInfoForm = this.formBuilder.group({
      homeNameControl: ['', [Validators.required]],
      townshipControl: ['', [Validators.required]],
      addressControl: ['', [Validators.required]],
    });
  }

  mapClicked(): void {
    const dialogRef = this.dialog.open(MapdialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.home.address = this.locationService.getAddress();
      console.log('The dialog was closed');
    });

  }

}
