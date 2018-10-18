/** This page is home page */

import { Component } from '@angular/core';

import { Quote } from '../../data/quote.interface';

import { QuoteServices } from '../../services/quotes';

import { ModalController } from 'ionic-angular';

import { QuotePage } from '../quote/quote';

import { SettingsService } from '../../services/settings';


@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor (private quotesService: QuoteServices,
               private modalCtrl: ModalController,
               private settingsService: SettingsService) {}

  // if the page was cached, ionViewDidLoad() won't be executed!
  // ionViewWillEnter() will always be executed if the page was cached,
  // and will be executed right before it's displayed.
  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {

    // TODO: Pass data to the modal.
    // to tell the Angular QuotePage is the content of the modal
    // a modal is an overlap over the current page
    // It uses a normal ionic page, but it's not placing it on the stack of the pages·
    // pass the selected code -> quote to the modal
    const modal = this.modalCtrl.create(QuotePage, quote);

    modal.present();

    // TODO: Pass data from a modal back to the page
    // a modal is a view
    // In the onDidDismiss, we can pass an argument (any data) to the next view beneath the modal.
    // After the modal did dismiss,里面的callback function will execute.
    modal.onDidDismiss((remove: boolean) => {

      // TODO: Delete and update
      if (remove) {

        this.onRemoveFromFavorites(quote);

      } 
    });
  }

  onRemoveFromFavorites(quote: Quote) {
      
    this.quotesService.removeQuoteFavorites(quote);
        
    const position = this.quotes.findIndex((quoteElement: Quote) => {
      return quoteElement.id == quote.id;
    });

    this.quotes.splice(position, 1);

  }

  // Method1
  getBackground() {
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground'
  }

  // Method2
  isAltBackground() {
    return this.settingsService.isAltBackground();
  }
}
