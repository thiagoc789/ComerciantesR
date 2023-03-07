import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosComponent } from './negocios.component';

describe('NegociosComponent', () => {
  let component: NegociosComponent;
  let fixture: ComponentFixture<NegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegociosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
