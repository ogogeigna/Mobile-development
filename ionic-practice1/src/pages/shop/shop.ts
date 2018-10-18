import { Component } from "@angular/core";

import { BuyoutPage } from "../buyout/buyout";

import { NavController } from "ionic-angular";


@Component({
    selector: 'shop-page',
    templateUrl: 'shop.html'
})

export class ShopPage {
   
    // load page
    // bind to nav controller
    constructor(private navCtrl: NavController) {
    }
    
    // 设置跳转界面
    // 注意传参写法！！！
    goToBuyout(productData: {name: string, quantity: number}) {

        // pass data to the buyout page
        this.navCtrl.push(BuyoutPage, productData)

    }
}