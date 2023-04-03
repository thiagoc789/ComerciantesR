import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sitemap-component',
  templateUrl: './sitemap-component.component.html',
  styleUrls: ['./sitemap-component.component.css']
})
export class SitemapComponentComponent {
  sitemap: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/assets/sitemap.xml', { responseType: 'text' }).subscribe((xml) => {
      console.log(xml)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');
      // Procesa el contenido del archivo sitemap aquí
      this.sitemap = xml; // Asigna el contenido del archivo a la propiedad sitemap
    });
  }

}
