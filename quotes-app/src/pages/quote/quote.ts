import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {

  person: string;
  text: string;

  // ViewController controls the current active/visible  pages
  constructor (private viewCtrl: ViewController,
               private navParams: NavParams) {}

  // It is the page that you're viewing no matter if it's the topmost page on the stack
  // or an overlay
  ionViewDidLoad() {
    // the data here is modal中的 quote
    this.person = this.navParams.get('person');
    this.text = this.navParams.get('text');
  }

  // provide the default value if no argument is passed
  // 给remove设置一个默认值
  onClose(remove = false) {
    // delete the page => we will see the topmost page again, because it was overlayed by modal
    // Then you should have sth. to dispaly instead
    
    this.viewCtrl.dismiss(remove);
  }

}
