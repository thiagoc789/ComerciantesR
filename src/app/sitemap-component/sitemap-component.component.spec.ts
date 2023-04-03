import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapComponentComponent } from './sitemap-component.component';

describe('SitemapComponentComponent', () => {
  let component: SitemapComponentComponent;
  let fixture: ComponentFixture<SitemapComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitemapComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitemapComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
