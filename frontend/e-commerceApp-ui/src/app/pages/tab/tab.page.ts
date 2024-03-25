import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit{
  isSelected = {
    profile: false,
    home: true,
    settings: false
  };

  activeTab(tab: string,autre1: string, autre2: string) {
    this.isSelected = { ...this.isSelected, [tab]: true };
    this.isSelected = { ...this.isSelected, [autre1]: false };
    this.isSelected = { ...this.isSelected, [autre2]: false };
  }
  constructor() {}
  

  ngOnInit() {
  }
}
