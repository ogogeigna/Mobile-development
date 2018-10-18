import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController } from 'ionic-angular';

import { Quote } from '../../data/quote.interface';
import { QuoteServices } from '../../services/quotes';



// ❗️❗️ 在HTML文件中要加 quoteGroup❓
// We want to dispaly them in our template. 
// The template will actually get to read it before ionViewDidLoad(),
// because the template (creation) is handled by Angular2.
// That is simply done before I want to trigger the items you did load hook

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{

  // state the object
  quoteGroup: {category: string, quotes: Quote[], icon: string};

  // Get the data
  // Method I: implements onInit
  constructor(private navParams: NavParams,
              private alertCtrl: AlertController,
              private quoteService: QuoteServices) {}

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }


  // Method II: 有坑！！容易出错
  // ❗️Add elvis operation (?)❗️ in template to use this approach
  // This will not be excuted if the page was cached

  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  // }


  // name : type
  onAddToFavorites(selectedQuote: Quote) {

    // we need to inject alert into controller
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure to add the quote',
      buttons: [
        {
          text: 'Yes, go ahead!',
          handler: () => {
            this.quoteService.addQuoteToFavorites(selectedQuote);
            console.log('OK');
          }
        },
        {
          text: 'No, I changed my mind!',

          // role 的作用： 
          // It tells Ionic if the alert is dimissed, execute the handler.
          // If you don't have role, the handler will only get executed if you hit the button.
          // 点击背景（alert之外）也会执行handler部分 -> cancel
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!');
          }
        }
      ]
    });

    alert.present();
    
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quoteService.removeQuoteFavorites(quote);
  }

  // check if is favorate or not
  isFavorite(quote: Quote) {
    return this.quoteService.isQuoteFavorite(quote);
  }
}
