import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/animations/fade';
import { Eventos } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

declare const google: any;

@Component({
  selector: 'app-detail-eventos',
  templateUrl: './detail-eventos.component.html',
  styleUrls: ['./detail-eventos.component.css'],
  animations: [fade]
})
export class DetailEventosComponent implements OnInit {

  map: any;
  currentPosition: any;
  evento: any;

  constructor(private firestore: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit() {

    const eventoId = this.route.snapshot.paramMap.get('id');
    this.firestore.getDoc<Eventos>('Eventos', eventoId).subscribe(res => {
      this.evento = res;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.evento.lat, lng: this.evento.long },
        zoom: 16,
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      const markerPos = new google.maps.LatLng(this.evento.lat, this.evento.long);

      const marker = new google.maps.Marker({
        position: markerPos,
        map: this.map,
        icon: {
          url: this.evento.imagen,
          scaledSize: new google.maps.Size(32, 32)
        }
      });

      marker.setMap(this.map);


      const infoWindow = new google.maps.InfoWindow({
        content: `
    <div style="background-color: #fff; color: #333; padding: 10px;">
      <h4 style="margin: 0 0 10px;">${this.evento.nombre}</h4>
      <p style="margin: 0;">${this.evento.lugar}</p>
    </div>
  `,
      });


      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

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
