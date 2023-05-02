import { Component } from '@angular/core';
import { fade } from 'src/app/animations/fade';
import { Droguerias, Estadio, Polideportivo } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  animations: [fade]
})
export class InfoComponent {
  diaActual2: string = '';
  diaActual: number = 0;
  semana: number = 0;
  diaActualNombre: string ="";
  busqueda: string = '';

  polideportivo: Polideportivo[];
  droguerias: Droguerias[];
  estadio: Estadio[];


  constructor(private firestore: FirestoreService) {
   }

  ngOnInit() {

    const fecha = new Date();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();

    // Si la hora actual es mayor o igual a las 06:00, actualiza el valor de diaActual
    if (hora >= 6 || (hora === 5 && minutos >= 0)) {
      this.diaActual = fecha.getDate();
      this.diaActual2 = this.diaActual.toString();
      
    }
    // Si no, usa el día anterior
    else {
      fecha.setDate(fecha.getDate() - 1);
      this.diaActual = fecha.getDate();
      this.diaActual2 = this.diaActual.toString();
    }

    
    if(this.diaActual2.length == 1){
      this.diaActual2 = '0'+this.diaActual2;
    }

    
      

    
    this.firestore.getCollection<Droguerias>('Droguerias').subscribe(res => {
      this.droguerias = res;  
    });

    this.semana = fecha.getDay();
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    this.diaActualNombre = diasSemana[this.semana];
    this.firestore.getCollection2<Polideportivo>('Polideportivo').subscribe(res => {
      this.polideportivo = res;

    });

    this.firestore.getCollection2<Estadio>('Estadio').subscribe(res => {
      this.estadio = res;

    });

  }

}
