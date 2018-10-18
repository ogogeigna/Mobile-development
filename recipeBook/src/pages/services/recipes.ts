import { Injectable } from "../../../node_modules/@angular/core";
import { Http, Response } from "../../../node_modules/@angular/http";
import 'rxjs/Rx';

import { Ingredient } from "../../models/ingredient";
import { Recipe } from "../../models/recipe";
import { AuthService } from "./auth";


@Injectable()
export class RecipesService {

    private recipes: Recipe[] = [];

    constructor(private http: Http, private authService: AuthService) {}

    addRecipe(title: string, 
              description: string, 
              difficulty: string, 
              ingredients: Ingredient[]) {

        this.recipes.push(new Recipe(title, description, difficulty, ingredients));

    }

    getRecipes() {
        return this.recipes.slice();
    }

    updateRecipe(index: number,
                 title: string,
                 description: string, 
                 difficulty: string,
                 ingredients: Ingredient[]) {

        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
        console.log(this.recipes);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-recipebook-824ac.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
                        .map((response: Response) => response.json());
    }

    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic-recipebook-824ac.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
                        .map((response: Response) => {
                            return response.json();
                        })
                        .do((recipes: Recipe[]) => {
                            if (recipes) {
                                this.recipes = recipes;
                            } else {
                                this.recipes = [];
                            }
                        });
    }
}