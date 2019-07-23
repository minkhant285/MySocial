import { Component, OnInit, Inject } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MapApiService, LocationService } from '../../../services';
import { locations, condos } from './locations';
import * as $ from 'jquery';

@Component({
  selector: 'ions-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  zoom: number;
  lat: number;
  lng: number;
  maptypeid: string;
  coordinates: object;
  mapType: string;
  pname: string = "";
  pland: string = "";
  pdescription: string = "";
  paddress: string = "";
  clat: number;
  clng: number;
  isCondo: boolean = false;
  condoName: string = "";
  condoAddress: string = "";

  constructor(
    private mapApiService: MapApiService,
    private locationService: LocationService
  ) {
    this.zoom = 5;
    this.maptypeid = "roadmap";
    // this.mapApiService.getPosition()
    //   .subscribe(
    //     (pos: Position) => {
    //       this.lat = pos.coords.latitude,
    //         this.lng = pos.coords.longitude
    //     });
  }

  ngOnInit() {
  }

  infoClicked(latitude, longitude, info) {
    console.log(info);
    this.lat = latitude;
    this.lng = longitude;
    this.zoom = 12;
    if (info == "Yangon") {
      this.zoom = 12;
      for (var i in locations[0].city.yangon.township) {
        this.markers.push(locations[0].city.yangon.township[i])
      }
      this.markers.splice(0, 1);
    }
    else if (info == "Mandalay") {
      this.zoom = 11;
      for (var i in locations[0].city.mandalay.township) {
        this.markers.push(locations[0].city.mandalay.township[i])
      }
      this.markers.splice(1, 1);
    }
    else if (info == locations[0].city.yangon.township.bahan.info) {
      while (this.markers.length > 0) {
        this.markers.pop();
        for (var i in condos[0].yangon.township.bahan) {
          this.condoMarker.push(condos[0].yangon.township.bahan[i]);
        }
      }
      this.isCondo = true;
      this.zoom = 14;
    }
    else if (info == locations[0].city.yangon.township.yankin.info) {
      while (this.markers.length > 0) {
        this.markers.pop();
        for (var i in condos[0].yangon.township.yankin) {
          this.condoMarker.push(condos[0].yangon.township.yankin[i]);
        }
      }
      this.isCondo = true;
      this.zoom = 14;
    }
    else if (info == locations[0].city.yangon.township.kamaryut.info) {
      while (this.markers.length > 0) {
        this.markers.pop();
        for (var i in condos[0].yangon.township.kamaryut) {
          this.condoMarker.push(condos[0].yangon.township.kamaryut[i]);
        }
      }
      this.isCondo = true;
      this.zoom = 14;
    }
    else if (info == locations[0].city.yangon.township.sanchaung.info) {
      while (this.markers.length > 0) {
        this.markers.pop();
        for (var i in condos[0].yangon.township.sanchaung) {
          this.condoMarker.push(condos[0].yangon.township.sanchaung[i]);
        }
      }
      this.isCondo = true;
      this.zoom = 14;
    }
  }

  condoClicked(name, address) {
    this.condoName = name;
    this.condoAddress = address;
    this.locationService.setAddress(name + "\n" + address);
  }

  dblClick($event: MouseEvent) {
    $("#property-box").show();
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


  mapChange() {
    this.maptypeid = this.mapType;
  }

  mapClicked($event: MouseEvent) {
    this.clat = $event.coords.lat;
    this.clng = $event.coords.lng;
    console.log(this.clat + "\n" + this.clng);
  }
  propertyadd() {
    this.properties = { name: this.pname, land: this.pland, description: this.pdescription, address: this.paddress };
    this.custommarker.push({
      lat: this.clat,
      lng: this.clng,
      info: "Custom",
      properties: this.properties
    });
    this.pname = "";
    this.pland = "";
    this.pdescription = "";
    this.paddress = ""
    $("#property-box").hide();
  }

  markers: marker[] = [
    {
      lat: locations[0].city.yangon.lat,
      lng: locations[0].city.yangon.lng,
      info: "Yangon"
    },
    {
      lat: locations[0].city.mandalay.lat,
      lng: locations[0].city.mandalay.lng,
      info: "Mandalay"
    }
  ];

  properties: object;
  custommarker: customMarker[] = [];
  condoMarker: condoMarker[] = [];

}

interface marker {
  lat: number;
  lng: number;
  info: string;
}

interface condoMarker {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

interface customMarker {
  lat: number;
  lng: number;
  info: string;
  properties: object;
}
