import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './pages/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { EventosComponent } from './pages/eventos/eventos.component';
import { NegociosComponent } from './pages/negocios/negocios.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

//PARA LA BASE DE DATOS
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { DetailnegociosComponent } from './pages/detailnegocios/detailnegocios.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DetailEventosComponent } from './pages/detail-eventos/detail-eventos.component';
import { InfoComponent } from './pages/info/info.component';
import { ServiceWorkerModule } from '@angular/service-worker';



//RUTAS
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full',component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'negocios', component: NegociosComponent },
  { path: 'eventos', component: EventosComponent },
  {
    path: 'detailNegocios/:id', component: DetailnegociosComponent
  },
  {
    path: 'detailEventos/:id', component: DetailEventosComponent
  },
  {
    path: 'info', component: InfoComponent
  },
];

@NgModule({
  imports: [
    GoogleMapsModule,
    CarouselModule,
    MatCardModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig,),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,

      registrationStrategy: 'registerWithDelay:1000'
    }),

  ],
  declarations: [
    AppComponent,
    HomeComponent,
    EventosComponent,
    NegociosComponent,
    DetailEventosComponent,
    InfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
