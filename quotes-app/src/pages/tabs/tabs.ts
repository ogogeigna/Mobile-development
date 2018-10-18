import { Component } from "@angular/core";

import { FavoritesPage } from "../favorites/favorites";

import { LibraryPage } from "../library/library";

@Component({
    selector: 'page-tabs',
    // 也可以写在HTML中,但是官方给的example也是写在这里
    // ❗️特别特别特别注意: template 后面不是单引号sigle quotes ‘’，而是back-tick `` !!!!!!!
    // sigle quotes'' means you can only type one line
    // back-tick `` means multiple lines
    // Dont forget yo register tabsPage in the app.module.ts
    template:`
        <ion-tabs>
            // tabIcon with various styles can be found in the official documents
            <ion-tab [root]="favoritesPage" tabTitle="Favorites" tabIcon="star"></ion-tab>
            <ion-tab [root]="libraryPage" tabTitle="Library" tabIcon="book"></ion-tab>
        </ion-tabs>`
})

export class TabsPage{
    favoritesPage = FavoritesPage;
    libraryPage = LibraryPage;
}