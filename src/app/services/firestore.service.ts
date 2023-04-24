import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { this.enablePersistence(); }

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

  
}


