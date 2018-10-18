// this page holds the default location

import { Component } from '@angular/core';
import { Location } from '../../models/location';
import { NavParams, ViewController } from '../../../node_modules/ionic-angular';

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})

export class SetLocationPage {

  location: Location;
  marker: Location;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController) {

    this.location = this.navParams.get('location');
    
    // if the location has changed, the user has set the location, 
    // then press select-on-map button, display the same location
    if (this.navParams.get('isSet')) {
      this.marker = this.location;
    }

  }

  onSetMarker(event: any) {
    console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }


  // Close the modal and pass the choosen location back to add-place page
  onConfirm() {

    // pass the marker location instead of the default location here
    this.viewCtrl.dismiss({location: this.marker});
  }

  // Close the modal by using view controller
  onAbort() {
    this.viewCtrl.dismiss();    
  }

}


