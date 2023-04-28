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
    { nombre: 'Agropecuarias y mascotas', icono: 'fas fa-paw', color: '#FF0000' },
    { nombre: 'Educación', icono: 'fas fa-graduation-cap', color: '#FF7F00' },
    { nombre: 'Ferreterias y electricidad', icono: 'fas fa-screwdriver-wrench', color: '#FFFF00' },
    { nombre: 'Hospedaje y hoteles', icono: 'fa-solid fa-hotel', color: '#00FF00' },
    { nombre: 'Manualidades', icono: 'fas fa-palette', color: '#0000FF' },
    { nombre: 'Medicamentos y aseo', icono: 'fas fa-pills', color: '#4B0082' },
    { nombre: 'Organización de eventos ', icono: 'fas fa-champagne-glasses', color: '#8B00FF' },
    { nombre: 'Papelerias y misceláneas', icono: 'fas fa-pencil-ruler', color: '#FF0000' },
    { nombre: 'Panaderías, pastelerias y heladerías', icono: 'fas fa-birthday-cake', color: '#FF7F00' },
    { nombre: 'Repuestos para vehiculos', icono: 'fas fa-gas-pump', color: '#000000' },
    { nombre: 'Servicio de grua y transporte', icono: 'fas fa-truck', color: '#00FF00' },
    { nombre: 'Recreación', icono: 'fa-regular fa-face-laugh-beam', color: '#0000FF' },
    { nombre: 'Reparaciones y mantenimientos', icono: 'fas fa-wrench', color: '#4B0082' },
    { nombre: 'Restaurantes y comidas rápidas', icono: 'fas fa-hamburger', color: '#8B00FF' },
    { nombre: 'Ropa y calzado', icono: 'fas fa-tshirt', color: '#FF0000' },
    { nombre: 'Salud y belleza', icono: 'fas fa-spa', color: '#FF7F00' },
    { nombre: 'Servicios empresariales', icono: 'fas fa-briefcase', color: '#FFFF00' },
    { nombre: 'Tiendas y supermercados', icono: 'fas fa-shopping-cart', color: '#00FF00' },
    { nombre: 'Tecnología', icono: 'fa-solid fa-microchip', color: '#0000FF' },
    { nombre: 'Variedades, detalles y accesorios', icono: 'fas fa-gift', color: '#4B0082' },
  ];

  constructor(private firestore: FirestoreService, private router: Router) { }

  categoriaActiva = -1;



  setCategoriaActiva(index: number) {
    this.categoriaActiva = index;
  }

  ngOnInit() {
    this.firestore.getNegocios().subscribe((res) => {
      this.negocios = res;
    });
  }

  buscarNegocios() {
    if (this.busqueda.trim() !== '') {
      const busquedaNormalizada = this.normalizarTexto(this.busqueda);
      const palabrasBusqueda = busquedaNormalizada.split(' ').filter(palabra => !this.palabrasExcluidas.includes(palabra));

      if (palabrasBusqueda.length > 0) {
        this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
          this.negocios = res.filter(negocio => {
            const descripcionSinHTML = this.eliminarEtiquetasHTML(negocio.descripcion);
            const nombreSinHTML = this.eliminarEtiquetasHTML(negocio.nombre);
            const descripcionNormalizada = this.normalizarTexto(descripcionSinHTML);
            const nombreNormalizado = this.normalizarTexto(nombreSinHTML);
            const id = negocio.id.toString()
            return palabrasBusqueda.some(palabra => descripcionNormalizada.includes(palabra) || nombreNormalizado.includes(palabra) || id.includes(palabra)) ;
          });
        });
      } else {
        this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
          this.negocios = res;
        });
      }
    } else {
      this.firestore.getCollection<Negocios>('Comerciantes').subscribe(res => {
        this.negocios = res;
      });
    }
  }



  buscarEventos(categoria: string) {
    this.busqueda = categoria;
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

  private descriptionLimit = 350;

  getLimitedDescription(negocio) {
    if (negocio.expanded || negocio.descripcion.length <= this.descriptionLimit) {
      return this.getFormattedDescription(negocio.descripcion)
    }
    return this.getFormattedDescription(negocio.descripcion.slice(0, this.descriptionLimit) + '...')
  }

  shouldShowReadMore(negocio) {
    return negocio.descripcion.length > this.descriptionLimit;
  }

  toggleDescription(negocio) {
    negocio.expanded = !negocio.expanded;
  }

  getFormattedDescription(description: string): string {
    // Aplicar el formateo de las oraciones (mayúsculas y minúsculas)
    const formattedDescription = this.formatDescription(description);

    // Reemplazar los caracteres \n por etiquetas HTML <br>
    return formattedDescription.replace(/\\n/g, '<br>');
  }

  formatDescription(description: string): string {
    // Convertir todo el texto en minúsculas
    const lowerCaseDescription = description.toLowerCase();

    // Convertir las letras encerradas entre asteriscos en mayúsculas
    const regex = /\*([a-zA-Z])\*/g;
    const formattedDescription = lowerCaseDescription.replace(regex, (match, letter) => letter.toUpperCase());

    const sentences = formattedDescription.split('. ');

    for (let i = 0; i < sentences.length; i++) {
      const firstChar = sentences[i].charAt(0).toUpperCase();
      const remainingChars = sentences[i].slice(1);
      sentences[i] = firstChar + remainingChars;
    }

    return sentences.join('. ');
  }

  private palabrasExcluidas = [
    'y', 'o', 'de', 'la', 'el', 'en', 'los', 'las', 'un', 'una', 'con', 'por', 'para', ' ', ''
  ];

  private eliminarEtiquetasHTML(texto: string): string {
    // Utiliza una expresión regular para eliminar las etiquetas de negrita y mayúsculas
    return texto.replace(/<b>|<\/b>|\*/g, '');
  }

}
