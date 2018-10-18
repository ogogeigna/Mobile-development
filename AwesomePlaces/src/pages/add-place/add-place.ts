import { Component } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { ModalController, LoadingController, ToastController } from '../../../node_modules/ionic-angular';
import { Location } from '../../models/location';

// import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';
import { PlacesService } from '../../service/places';
import { Cordova } from '../../../node_modules/@ionic-native/core';

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})

export class AddPlacePage {

  location: Location ={
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File) {

  }

  onSubmit(form: NgForm) {

    this.placesService.addPlace(form.value.title, 
                                form.value.description, 
                                this.location, 
                                this.imageUrl);

    // reset the form and location
    form.reset();   
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;   

  }

  // modal is an overlayer
  onOpenMap() {

    // pass two params
    const modal = this.modalCtrl.create(SetLocationPage, 
                                        {location: this.location, isSet: this.locationIsSet});
    modal.present();

    // Create a listener to listen the data passed from the modal, if some data does exist.
    // If data exists -> real location, we should retrieve, display it
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );

  }


  // Plugins: import, constructor, appModule->providers
  
  onLocate() {

    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();

    // return a promise
    
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could not get location',
            duration: 2500
          });
          toast.present();
        }
      );
  }

  onTakePhoto() {

    this.camera.getPicture({
      encodingType: this.camera.EncodingType.PNG,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
          .then(
            (data: Entry) => {
              this.imageUrl = data.nativeURL;
              this.camera.cleanup();
              // They are the same: File.removeFile(path, currentName);
            }
          )
          .catch(
            (err: FileError) => {
              this.imageUrl = '';
              const toast = this.toastCtrl.create({
                message: 'Could not save the image. Please try again',
                duration: 2500
              });
              toast.present();
              this.camera.cleanup();
            }
          );
          this.imageUrl = imageData;
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: 'Could not save the image. Please try again',
            duration: 2500
          });
          toast.present();
        }
      )
  }

}
