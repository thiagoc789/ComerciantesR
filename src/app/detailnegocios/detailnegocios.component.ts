import { Component, OnInit } from '@angular/core';
import { fade } from '../animations/fade';
import { Negocios } from '../models/models';
import { FirestoreService } from '../services/firestore.service';


@Component({
  selector: 'app-detailnegocios',
  templateUrl: './detailnegocios.component.html',
  styleUrls: ['./detailnegocios.component.css'],
  animations: [fade]
  

})
export class DetailnegociosComponent implements OnInit {

  negocios: Negocios[];

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {

    this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
      console.log(res)
      this.negocios = res;
      console.log(this.negocios)
    })

  }



}
