import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fade } from '../animations/fade';
import { Negocios } from '../models/models';
import { FirestoreService } from '../services/firestore.service';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css'],
  animations: [fade]
})
export class Tab1Component implements OnInit {

  negocios: Negocios[];

  items = [
    { image: 'https://picsum.photos/id/1015/900/500', title: 'Image 1', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { image: 'https://picsum.photos/id/1016/900/500', title: 'Image 2', caption: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { image: 'https://picsum.photos/id/1018/900/500', title: 'Image 3', caption: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
  ];

  options: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['Anterior', 'Siguiente'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {

    this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
      console.log(res)
      this.negocios = res;
      console.log(this.negocios)
    })
    
  }

}
