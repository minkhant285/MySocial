export interface Home {
    id: string;
    userID: string;
    name: string;
    type: string;        // Land, Condo, Apartment

}

export class Home implements Home {
    id: string;
    userID: string;
    name: string;
    type: string;  // Land, Condo, Apartment

}
export class LocationData extends Home {
    location:
        {
            landmarks: string;
            geolocation: string;   // 'lat,lon'
            address: string;
            street: string;
            ward: string;
            township: string;
            postCode: string;
            city: string;
            state: string;
            country: string;
        }
}
