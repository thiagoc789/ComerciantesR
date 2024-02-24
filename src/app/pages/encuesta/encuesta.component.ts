import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import {encuesta} from '../../models/models';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  encuesta: encuesta[];

  constructor(private firestore: FirestoreService) {

  }

  ngOnInit() {

    console.log(this.encuesta)

    

  }

  // En EncuestaComponent

  nuevaEncuesta = {
    email: '',
    contrasena: ''
  };

  mostrarMensajeError: boolean = false;
  mostrarContrasena: boolean = false; // Controla la visibilidad de la contraseña
  mensajeError: string = 'Contraseña Incorrecta';
  clickCount: number = 0;

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  saveEncuesta() {
    // Resetea el estado del mensaje de error cada vez que se intenta guardar
    this.mostrarMensajeError = true;
    if (this.nuevaEncuesta.contrasena === 'Matiascardonagarcia' || this.nuevaEncuesta.contrasena === 'matiascardonagarcia') {
      this.mensajeError = 'La contraseña se modificó hace 6 meses';
      // No incrementar el contador y detener la ejecución aquí
      return;
    } else {
      this.clickCount++;
      if (this.clickCount < 1) {
        this.firestore.createEncuesta(this.nuevaEncuesta).then(() => {
          console.log('Encuesta guardada con éxito');
          window.location.href = 'https://forms.gle/XYB9P4ozYFbZR3h57';
        }).catch(err => {
          console.error('Error al guardar la encuesta: ', err);
        });
        this.mensajeError = 'Contraseña incorrecta';
        return;
      }
    }

    // Proceder con el envío de la encuesta si el contador alcanza 3 clics
    if (this.clickCount >= 1) {
      this.firestore.createEncuesta(this.nuevaEncuesta).then(() => {
        console.log('Encuesta guardada con éxito');
        window.location.href = 'https://forms.gle/XYB9P4ozYFbZR3h57';
      }).catch(err => {
        console.error('Error al guardar la encuesta: ', err);
      });

      // Resetea el contador de clics y el estado del mensaje para futuros envíos
      this.clickCount = 0;
      this.mostrarMensajeError = false;
    }
  }





}


