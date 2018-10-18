import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-buyout',
  templateUrl: 'buyout.html',
})

export class BuyoutPage implements OnInit {

  productData: {
    name: string,
    quantity: number
  };

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    // retrieve data
    // 直接写data就好，因为之前我们已经打包好了object as data (productData)
    this.productData = this.navParams.data;
  }
  
  // Go back to the Home Page (root page)
  goBackHome() {
    this.navCtrl.popToRoot();
  }

}
