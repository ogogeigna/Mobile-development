import { Component } from '@angular/core';
import { Place } from '../../models/place';
import { NavParams, ViewController } from '../../../node_modules/ionic-angular';
import { PlacesService } from '../../service/places';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: Place;
  index: number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private placesService: PlacesService,
             ) {

    // place is the name we set in the HomePage
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }

  onLeave() {
        this.viewCtrl.dismiss();
  }

  onDelete() {
    this.placesService.deletePlace(this.index);
    this.onLeave();
  }
}
