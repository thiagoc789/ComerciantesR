import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from 'src/app/animations/fade';
import { Eventos, Negocios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  animations: [fade]
})
export class EventosComponent {

  eventos: Eventos[];
  busqueda: string = '';

  constructor(private firestore: FirestoreService, private router: Router) { }

  ngOnInit() {
    this.firestore.getCollection<Eventos>('Eventos').subscribe(res => {
      this.eventos = res;
    });
  }

  buscarEventos() {
    if (this.busqueda.trim() !== '') {
      const busquedaNormalizada = this.normalizarTexto(this.busqueda);
      const palabrasBusqueda = busquedaNormalizada.split(' ');
      this.firestore.getCollection<Eventos>('Eventos').subscribe(res => {
        this.eventos = res.filter(eventos => {
          const descripcionNormalizada = this.normalizarTexto(eventos.descripcion);
          const nombreNormalizado = this.normalizarTexto(eventos.nombre);
          return palabrasBusqueda.some(palabra => descripcionNormalizada.includes(palabra) || nombreNormalizado.includes(palabra));
        });
      });
    } else {
      this.firestore.getCollection<Eventos>('Eventos').subscribe(res => {
        this.eventos = res;
      });
    }
  }


  normalizarTexto(texto: string) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/,/g, "");
  }

  verTodos() {
    this.busqueda = '';
    this.buscarEventos();
  }

  goToDetailEventos(Id: number) {
    //this.navCtrl.navigateForward(['/detail-negocios', id]);
    this.router.navigateByUrl(`/detailEventos/${Id}`);
  }

}
