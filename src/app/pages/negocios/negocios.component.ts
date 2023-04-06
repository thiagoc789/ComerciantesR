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
  
  categorias = [
    { nombre: 'Restaurantes comidas rápidas', icono: 'fas fa-hamburger', color: '#FF5733' },
    { nombre: 'Panaderías y Postres', icono: 'fas fa-birthday-cake', color: '#FFC300' },
    { nombre: 'Tiendas y Supermercados', icono: 'fas fa-shopping-cart', color: '#DAF7A6' },
    { nombre: 'Medicamentos y Aseo', icono: 'fas fa-pills', color: '#581845' },
    { nombre: 'Reparaciones y mantenimientos', icono: 'fas fa-wrench', color: '#7FDBFF' },
    { nombre: 'Salud y Belleza', icono: 'fas fa-spa', color: '#FFDC00' },
    { nombre: 'Educación', icono: 'fas fa-graduation-cap', color: '#E6E6FA' },
    { nombre: 'Variedades y accesorios', icono: 'fas fa-gift', color: '#FFE4E1' },
    { nombre: 'Mascotas', icono: 'fas fa-paw', color: '#1ABC9C' },
    { nombre: 'Papelerias y misceláneas', icono: 'fas fa-pencil-ruler', color: '#F5B7B1' },
    { nombre: 'Deporte', icono: 'fas fa-football-ball', color: '#6C3483' },
    { nombre: 'Servicios empresariales', icono: 'fas fa-briefcase', color: '#FF5733' },
    { nombre: 'Entretenimiento', icono: 'fas fa-theater-masks', color: '#FFC300' },
    { nombre: 'Manualidades', icono: 'fas fa-palette', color: '#DAF7A6' },
    { nombre: 'Ropa y Lavandería', icono: 'fas fa-tshirt', color: '#581845' },
  ];

  constructor(private firestore: FirestoreService, private router: Router) { }

  categoriaActiva = -1;

  setCategoriaActiva(index: number) {
    this.categoriaActiva = index;
  }

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

          return palabrasBusqueda.every(palabra => categoria.includes(palabra));



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
