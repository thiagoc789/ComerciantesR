import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';

import { fade } from '../../animations/fade';
import { Eventos, Negocios } from '../../models/models';
import { FirestoreService } from '../../services/firestore.service';
import { mergeMapTo } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fade]
})
export class HomeComponent implements OnInit {

  negocios: Negocios[];
  eventos: Eventos[];


  constructor(private firestore: FirestoreService, private router: Router, private afMessaging: AngularFireMessaging) { 
    this.getToken()
  }

  ngOnInit() {

    this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
      this.negocios = res;
    })

    this.firestore.getCollection<Eventos>('Eventos').subscribe(res => {
      this.eventos = res;
    })
    
  }

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },
      );
  }

  getToken(){
    this.afMessaging.getToken.subscribe((res) => console.log("token: ", res));
  }

  goToDetailNegocios(Id: number) {
    //this.navCtrl.navigateForward(['/detail-negocios', id]);
    this.router.navigateByUrl(`/detailNegocios/${Id}`);
  }


  goToDetailEventos(Id: number) {
    //this.navCtrl.navigateForward(['/detail-negocios', id]);
    this.router.navigateByUrl(`/detailEventos/${Id}`);
  }



}
