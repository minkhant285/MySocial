import * as mongoose from "mongoose";

export const HomeSchema = new mongoose.Schema({
    id: String,
    userID: String,
    name: String,
    type: String,
    location: {
        landmarks: String,
        geolocation: String,   // 'lat,lon'
        address: String,
        street: String,
        ward: String,
        township: String,
        postCode: String,
        city: String,
        state: String,
        country: String,
    }
});
