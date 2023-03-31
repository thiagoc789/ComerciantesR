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

  categorias = [
  { nombre: 'Entretenimiento', icono: 'bi bi-hamburger' }, 
  { nombre: 'Bebidas', icono: 'bi bi-cup-straw' }, 
  { nombre: 'Ropa', icono: 'bi bi-tshirt' }, 
  { nombre: 'Tecnología', icono: 'bi bi-laptop' },];


  botonClicado = false;

  negocios: Negocios[];
  negociosFiltrados = [];
  eventos: Eventos[];
  busqueda: string = '';

  constructor(private firestore: FirestoreService, private router: Router, private afMessaging: AngularFireMessaging) { 
    this.getToken()
    
  }
  ngOnInit() {
    const botonClicado = localStorage.getItem('botonClicado');
    if (botonClicado === 'true') {
      this.botonClicado = true;
    }

    

    this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
      this.negocios = res;
    })

    this.firestore.getCollection<Eventos>('Eventos').subscribe(res => {
      this.eventos = res;
    })
    
  }

  requestPermission() {
    this.botonClicado = true;
    localStorage.setItem('botonClicado', 'true');
    
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token);  },
        (error) => { console.error(error); },     
      );
  }

  getToken() {
    this.afMessaging.getToken.subscribe((res) => {
      console.log("token: ", res);
      
    });
    
    
  }

  goToDetailNegocios(Id: number) {
    //this.navCtrl.navigateForward(['/detail-negocios', id]);
    this.router.navigateByUrl(`/detailNegocios/${Id}`);
  }


  goToDetailEventos(Id: number) {
    //this.navCtrl.navigateForward(['/detail-negocios', id]);
    this.router.navigateByUrl(`/detailEventos/${Id}`);
  }

  buscarEventos(categoria: string) {
    console.log(categoria)
    this.busqueda = categoria;
    console.log(this.busqueda)
    if (this.busqueda.trim() !== '') {
      const busquedaNormalizada = this.normalizarTexto(this.busqueda);
      const palabrasBusqueda = busquedaNormalizada.split(' ');
      this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
        this.negocios = res.filter(negocios => {
          const categoria = this.normalizarTexto(negocios.categoria);
          return palabrasBusqueda.some(palabra =>  categoria.includes(palabra));
        });
      });
    } else {
      this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
        this.negocios = res;
      });
    }
  }

  normalizarTexto(texto: string) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/,/g, "");
  }

  verTodos() {
    this.busqueda = '';
    this.buscarEventos('');
  }




}
