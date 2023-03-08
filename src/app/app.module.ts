import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { Tab1Component } from './tab1/tab1.component';
import { MatIconModule } from '@angular/material/icon';
import { BuscarComponent } from './buscar/buscar.component';
import { EventosComponent } from './eventos/eventos.component';
import { NegociosComponent } from './negocios/negocios.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

//PARA LA BASE DE DATOS
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { DetailnegociosComponent } from './detailnegocios/detailnegocios.component';


//RUTAS
const routes: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: Tab1Component },
  { path: 'buscar', component: BuscarComponent },
  { path: 'negocios', component: NegociosComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'detailNegocios/:id', component: DetailnegociosComponent
   },
];

@NgModule({
  imports: [
    CarouselModule,
    MatCardModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    
    FormsModule,
    MatTabsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig,),

    
  ],
  declarations: [
    AppComponent,
    Tab1Component,
    BuscarComponent,
    EventosComponent,
    NegociosComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
