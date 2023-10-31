import { NgModule} from '@angular/core';
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
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { SitemapComponentComponent } from './sitemap-component/sitemap-component.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ModalComponent } from './modal/modal.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component'; 

//RUTAS
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full',component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'negocios', component: NegociosComponent },
  { path: 'eventos', component: EventosComponent },
  {path: 'detailNegocios/:id', component: DetailnegociosComponent},
  {path: 'detailEventos/:id', component: DetailEventosComponent},
  {path: 'info', component: InfoComponent},
  { path: 'encuesta', component: EncuestaComponent },    
  { path: 'sitemap.xml', component: SitemapComponentComponent }
];

@NgModule({
  imports: [
    LazyLoadImageModule,
    CommonModule,
    AngularFireMessagingModule,
    GoogleMapsModule,
    HttpClientModule,
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
      registrationStrategy: 'registerImmediately'
    }),

  ],
  declarations: [
    AppComponent,
    HomeComponent,
    EventosComponent,
    NegociosComponent,
    DetailEventosComponent,
    DetailnegociosComponent,
    InfoComponent,
    ModalComponent,
    EncuestaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
