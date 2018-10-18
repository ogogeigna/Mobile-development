import { Component } from '@angular/core';
import { reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = ['Apples', 'Bananas', 'Berries'];

  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
  }

  // onClick() {
  //   console.log('Clicked!');
  // }

  // onElementClicked() {
  //   console.log('I was clicked or touched');
  // }
  
  // onElementTapped() {
  //   console.log('I was tapped');
  // }

  // onElementPressed() {
  //   console.log('I was pressed');
  // }
}


// You need to set reorder to true (on <ion-list> ) and add a listener to the ionItemReorder  event. 
// In the method executed on this event, 
// you should simply use the reorderArray method (which is provided by ionic-angular ) to reorder your array.
