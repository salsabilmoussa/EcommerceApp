import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  isSelected = {
    profile1: false,
    article: true,
    settings: false
  };

  activeTab(tab: string,autre1: string, autre2: string) {
    this.isSelected = { ...this.isSelected, [tab]: true };
    this.isSelected = { ...this.isSelected, [autre1]: false };
    this.isSelected = { ...this.isSelected, [autre2]: false };
  }
  constructor() { }

  ngOnInit() {
  }

}
