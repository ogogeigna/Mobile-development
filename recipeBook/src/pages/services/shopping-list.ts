import { Ingredient } from "../../models/ingredient";

import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth";

// ❗️This can be found in Angular Docs
// Then you can use map() which can allow us to extract .json file
import 'rxjs/Rx';

// ❗️
// From online search: 
// 如果所创建的服务不依赖于其他对象，是可以不用使用 Injectable 类装饰器。
// 但当该服务需要在构造函数中注入依赖对象，就需要使用 Injectable 装饰器。
// 不过比较推荐的做法不管是否有依赖对象，在创建服务时都使用 Injectable 类装饰器。
@Injectable()
export class ShoppingListService {

    private ingredients: Ingredient[] = [];


    constructor(private http: Http, private authService: AuthService) {}


    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    // TODO: 添加多个items
    // ... free dots means deconstruct this array into its individual elements
    // so that we have a list of elements instead of an array of elements
    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    // Get a copy of this array
    getItems() {
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }


    storeList(token: string) {

        // Firebase will give the unique ID at the backend
        const userId = this.authService.getActiveUser().uid;

        // ❗️必须是 .json 结尾！！！！
        // this.ingrediens: body of the data to be sent
        // Why use put instead of post? => I want to overwrite the old data, 
        //                                 because I'm gonna put an array of list items to add service to the databse.
        // And I want to overwrite any existing array of items.
        // If use POST here, Firebase will simply add your array of items to the existing arrays of items.
        // So you'll get a larger array of sub arrays of items. It won't merge to those items.
        return this.http
                .put('https://ionic-recipebook-824ac.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
                .map((response: Response) => {
                    return response.json();     // extract .json file and return a JS file
                });
        
        // put (path) => copy from firebase + your own path (userId + '/target.json'), BODY
        // HTTP returns an observable, we need to subscribe. (But we don't subscribe here, we use 'return' to subscribe in the other page)
    }


    fetchList(token: string) {

        const userId = this.authService.getActiveUser().uid;

        return this.http.get('https://ionic-recipebook-824ac.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
                        .map((response: Response) => {
                            return response.json();
                        })
                        .do((ingredients: Ingredient[]) => {         
                            if (ingredients) {
                                this.ingredients = ingredients;
                            } else {
                                this.ingredients = [];
                            }
                          
                        // do() will run on the result of this observable
                        // just like subscribe but in-between it's not the SUBSCRIBE method
                        // it just allows us to use the reponse data if someone else subscribes
                        // so like a listener in-bewteen
                        });
    
    }

}

// The service should be added into the providers of app.module.ts