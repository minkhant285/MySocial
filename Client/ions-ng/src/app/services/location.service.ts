import { Injectable } from '@angular/core';

const countryList = ['Malaysia', 'Thailand', 'Vietnam', 'Myanmar', 'Others'];
const myCityList = ['Kuala Lumpur', 'Penang', 'Johor Baru'];
const thCityList = ['Bangkok', 'Phuket'];
const veCityList = ['Ho Chi Minh', 'Hanoi'];
const myanCityList = ['Yangon','Mandalay','Taunggyi'];

@Injectable()
export class LocationService {
    public address:string;

    constructor() {
    }

    public getCountryList(): string[] {
        return countryList;
    }

    public getCityList(country: string): string[] {

        switch (country) {
            case 'Malaysia':
                return myCityList;
            case 'Thailand':
                return thCityList;
            case 'Vietnam':
                return veCityList;
            case 'Myanmar':
                return myanCityList;
            default:
                return myCityList;
        }
    }

    public setAddress(add): string {
        return this.address=add;
    }

    public getAddress(): string {
        return this.address;
    }
}
