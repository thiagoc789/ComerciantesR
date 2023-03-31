import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from 'src/app/animations/fade';
import { Negocios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css'],
  animations: [fade]
})
export class NegociosComponent {

  negocios: Negocios[];
  busqueda: string = '';

  constructor(private firestore: FirestoreService, private router: Router) { }

  ngOnInit() {
    this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
      this.negocios = res;
    });
  }

  buscarNegocios() {
  console.log(this.busqueda)
    if (this.busqueda.trim() !== '') {
      const busquedaNormalizada = this.normalizarTexto(this.busqueda);
      const palabrasBusqueda = busquedaNormalizada.split(' ');
      this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
        this.negocios = res.filter(negocio => {
          const descripcionNormalizada = this.normalizarTexto(negocio.descripcion);
          const nombreNormalizado = this.normalizarTexto(negocio.nombre);
          return palabrasBusqueda.some(palabra => descripcionNormalizada.includes(palabra) || nombreNormalizado.includes(palabra));
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
    this.buscarNegocios();
  }

  goToDetailNegocios(Id: number) {
    //this.navCtrl.navigateForward(['/detail-negocios', id]);
    this.router.navigateByUrl(`/detailNegocios/${Id}`);
  }

}
