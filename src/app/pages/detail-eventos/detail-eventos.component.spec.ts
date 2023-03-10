import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEventosComponent } from './detail-eventos.component';

describe('DetailEventosComponent', () => {
  let component: DetailEventosComponent;
  let fixture: ComponentFixture<DetailEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
