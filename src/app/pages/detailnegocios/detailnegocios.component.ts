import { Component, OnInit } from '@angular/core';
import { fade } from '../../animations/fade';
import { Negocios } from '../../models/models';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-detailnegocios',
  templateUrl: './detailnegocios.component.html',
  styleUrls: ['./detailnegocios.component.css'],
  animations: [fade]

})
export class DetailnegociosComponent implements OnInit {
  map: any;
  currentPosition: any;
  negocio: any;



  constructor(private firestore: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    const negocioId = this.route.snapshot.paramMap.get('id');
    this.firestore.getDoc<Negocios>('Comerciantes', negocioId).subscribe(res => {
      this.negocio = res;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.negocio.lat, lng: this.negocio.long },
        zoom: 16,
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      const markerPos = new google.maps.LatLng(this.negocio.lat, this.negocio.long);

      // Crea un nuevo objeto Marker
      const marker = new google.maps.Marker({
        position: markerPos,
        map: this.map,
        icon: {
          url: 'assets/icons/logo.png',
          scaledSize: new google.maps.Size(32, 32)
        }
      });

      marker.setMap(this.map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // Crear marcador en la posición actual
          const currentLocationMarker = new google.maps.Marker({
            position: this.currentPosition,
            map: this.map,
            icon: {
              url: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
              scaledSize: new google.maps.Size(32, 32)
            }
          });
        });

      }
    })
  }
}