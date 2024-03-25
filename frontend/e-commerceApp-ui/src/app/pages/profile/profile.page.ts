import { Component, OnInit } from '@angular/core';


interface Product {
  img: string;
  title: string;
  price: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  

  products : Product[] =[
    {img : "../../../assets/images/gris.png",title : "Lorem Ipsum Dolor Sit Amet", price : "$ 122.00"},
    {img : "../../../assets/images/black.png",title : "Lorem Ipsum Dolor Sit Amet", price : "$ 330.00"},
    {img : "../../../assets/images/beig.png",title : "Lorem Ipsum Dolor Sit Amet", price : "$ 122.00"}
  ];

  isSelected = {
    profile: true,
    bag: false
  };

  activeTab(tab: string,autre: string) {
    this.isSelected = { ...this.isSelected, [tab]: true };
    this.isSelected = { ...this.isSelected, [autre]: false };
  }

  constructor() { }

  ngOnInit() {
  }

}
