import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailnegociosComponent } from './detailnegocios.component';

describe('DetailnegociosComponent', () => {
  let component: DetailnegociosComponent;
  let fixture: ComponentFixture<DetailnegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailnegociosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailnegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
