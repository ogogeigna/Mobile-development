import { Component } from '@angular/core';

import { Toggle } from 'ionic-angular';

import { SettingsService } from '../../services/settings';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private settingsService: SettingsService) {}

  // We've known that the event actually is of type Toggle
  // Toggle is a event type of class
  onToggle(toggle: Toggle) {
    this.settingsService.setBackground(toggle.checked);
  }

  checkAltBackground() {
    return this.settingsService.isAltBackground();
  }

}
