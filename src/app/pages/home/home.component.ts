import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';

import { fade } from '../../animations/fade';
import { Eventos, Negocios } from '../../models/models';
import { FirestoreService } from '../../services/firestore.service';
import { mergeMapTo } from 'rxjs/operators';
import { LoadStatusService } from 'src/app/load-status.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fade]
})
export class HomeComponent implements OnInit {

  categorias = [
    { nombre: 'Restaurantes y comidas rápidas', icono: 'fas fa-hamburger', color: '#FF5733' },
    { nombre: 'Panaderías y heladerías', icono: 'fas fa-birthday-cake', color: '#FFC300' },
    { nombre: 'Tiendas y supermercados', icono: 'fas fa-shopping-cart', color: '#DAF7A6' },
    { nombre: 'Medicamentos y aseo', icono: 'fas fa-pills', color: '#581845' },
    { nombre: 'Hospedaje y hoteles', icono: 'fa-solid fa-hotel', color: '#F5B7B1' },
    { nombre: 'Tecnología', icono: 'fa-solid fa-microchip', color: '#FF5733' },
    { nombre: 'Reparaciones y mantenimientos', icono: 'fas fa-wrench', color: '#7FDBFF' },
    { nombre: 'Salud y belleza', icono: 'fas fa-spa', color: '#FFDC00' },
    { nombre: 'Educación', icono: 'fas fa-graduation-cap', color: '#E6E6FA' },
    { nombre: 'Variedades, detalles y accesorios', icono: 'fas fa-gift', color: '#FFE4E1' },
    { nombre: 'Agropecuarias y mascotas', icono: 'fas fa-paw', color: '#1ABC9C' },
    { nombre: 'Papelerias y misceláneas', icono: 'fas fa-pencil-ruler', color: '#F5B7B1' },
    { nombre: 'Recreación', icono: 'fa-regular fa-face-laugh-beam', color: '#6C3483' },
    { nombre: 'Servicios empresariales', icono: 'fas fa-briefcase', color: '#FF5733' },
    { nombre: 'Organización de eventos ', icono: 'fas fa-champagne-glasses', color: '#FFC300' },
    { nombre: 'Manualidades', icono: 'fas fa-palette', color: '#DAF7A6' },
    { nombre: 'Ropa y calzado', icono: 'fas fa-tshirt', color: '#581845' },
    { nombre: 'Ferreterias y electricidad', icono: 'fas fa-screwdriver-wrench', color: '#1ABC9C' },
    { nombre: 'Repuestos para vehiculos', icono: 'fas fa-car-burst', color: '#7FDBFF' },
  ];


  botonClicado = false;
  negocios: Negocios[];
  negociosFiltrados = [];
  eventos: Eventos[];
  busqueda: string = '';
  isLoading = true;

  constructor(private firestore: FirestoreService, private router: Router, private afMessaging: AngularFireMessaging, private loadStatusService: LoadStatusService) {
    this.getToken()

  }

  categoriaActiva = -1;

  setCategoriaActiva(index: number) {
    this.categoriaActiva = index;
  }

  ngOnInit() {
    const botonClicado = localStorage.getItem('botonClicado');
    if (botonClicado === 'true') {
      this.botonClicado = true;
    }

    this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
      this.negocios = res;
      this.isLoading = false;
      this.loadStatusService.isFirstLoad = false;

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
        (token) => { console.log('Permission granted! Save to the server!', token); },
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
    this.buscarEventos('');
  }

  get isFirstLoad(): boolean {
    return this.loadStatusService.isFirstLoad;
  }




}
