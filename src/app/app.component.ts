import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit() {
    // Comprobar si hay una nueva versión del Service Worker cada hora
    setInterval(() => {
      this.updateServiceWorker();
    }, 60 * 60 * 1000);
  }

  updateServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.update().then(() => {
            console.log('Service Worker updated');
          });
        }
      });
    }
  }

}
