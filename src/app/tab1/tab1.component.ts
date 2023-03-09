import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(private firestore: FirestoreService, private router: Router) { }

  ngOnInit() {

    this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
      console.log(res)
      this.negocios = res;
      console.log(this.negocios)
    })
    
  }

  goToDetail(imageId: number) {
    //this.navCtrl.navigateForward(['/detail-negocios', id]);
    this.router.navigateByUrl(`/detailNegocios/${imageId}`);
    console.log("click")

  }

}
