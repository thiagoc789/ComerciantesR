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

  saveEncuesta() {
    this.firestore.createEncuesta(this.nuevaEncuesta).then(() => {
      console.log('Encuesta guardada con éxito');
      window.location.href = 'https://forms.gle/F22SXoSXeyyT9qWu6';
    }).catch(err => {
      console.error('Error al guardar la encuesta: ', err);
    });
  }



}


