import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private swUpdate: SwUpdate) {
    // Comprobar si hay una nueva versión disponible
    this.swUpdate.available.subscribe(() => {
      if (confirm('Hay una nueva versión disponible. ¿Quieres actualizar?')) {
        window.location.reload();
      }
    });

    // Comprobar si hay actualizaciones cada hora
    setInterval(() => {
      this.swUpdate.checkForUpdate();
    }, 60 * 60 * 1000); // Cada hora
  }

}
