import { Place } from "../models/place";
import { Location } from "../models/location";

import { Storage } from '@ionic/storage';
import { Injectable } from "../../node_modules/@angular/core";
import { File } from '@ionic-native/file';

declare var cordova: any;

@Injectable()
export class PlacesService {
    private places: Place[] = [];

    constructor(private storage: Storage,
                private file: File) {}

    addPlace(title: string, 
             description: string, 
             location: Location, 
             imageUrl: string) {

        const place = new Place(title, description, location, imageUrl);
        this.places.push(place);

        // key - value
        this.storage.set('places', this.places)
            .then(
                data => {

                }
            )
            .catch(
                err => {
                    this.places.splice(this.places.indexOf(place), 1);
                }
            );

    }

    // TODO: fetch the place
    // return the copy of the array
    loadPlaces() {
        return this.places.slice();
    }

    fetchPlaces() {
        this.storage.get('places')
            .then(
                (places: Place[]) => {
                    // Because we want to loop it, so we need to keep it not Null
                    this.places = places != null ? places : [];
                }
            )
            .catch(
                err => console.log(err)
            );
    }

    deletePlace(index: number) {

        const place = this.places[index];

        // remove the element
        this.places.splice(index, 1);
        // Then overwrite the element
        this.storage.set('places', this.places)
            .then(
                () => {
                    this.removeFile(place);
                }
            )
            .catch(
                err => console.log(err)
        );
    }

    private removeFile(place: Place) {
        const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(
                () => console.log('Removed File')
            )
            .catch(
                () => {
                    console.log('Error while removing File');
                    this.addPlace(place.title, place.description, place.location, place.imageUrl);
                }
            );
    }

}