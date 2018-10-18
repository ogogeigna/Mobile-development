import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { PlacesService } from '../../service/places';
import { Place } from '../../models/place';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  addPlacePage = AddPlacePage;
  places: Place[] = [];
  
  constructor(public modalCtrl: ModalController, 
              private placesService: PlacesService) {

  }

  ngOnInit() {
    this.placesService.fetchPlaces();
  }

  // don't forget to add service into the providers
  ionViewWillEnter() {

    // return the copy of this array
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
  }

}
