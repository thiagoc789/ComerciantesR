import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {Negocios } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private negocios$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) { 
    this.enablePersistence(); 
    this.loadNegocios();
}

  async enablePersistence() {
    try {
      await this.firestore.firestore.enablePersistence();
    } catch (err) {
      if (err.code == 'failed-precondition') {
        console.error('La persistencia de múltiples pestañas no está habilitada.');
      } else if (err.code == 'unimplemented') {
        console.error('El navegador actual no admite la persistencia.');
      }
    }
  }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  // En FirestoreService

  createEncuesta(data: { email: string, contrasena: string }) {
    // Obtén una referencia a la colección 'encuesta'
    const collection = this.firestore.collection('encuesta');

    // Añade un nuevo documento a la colección y devuelve una Promise
    return collection.add(data);
  }


  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }


  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path, ref => ref.orderBy('nombre'));
    return collection.valueChanges();
  }

  getCollection2<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  private loadNegocios() {
    const collection = this.firestore.collection<Negocios>('Comerciantes', ref => ref.orderBy('nombre'));
    this.negocios$ = collection.valueChanges();
  
  }

  public getNegocios(): Observable<any[]> {
    return this.negocios$;
  }

  
}


