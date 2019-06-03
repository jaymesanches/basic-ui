import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoFreteCorreiosComponent } from './calculo-frete-correios.component';

describe('CalculoFreteCorreiosComponent', () => {
  let component: CalculoFreteCorreiosComponent;
  let fixture: ComponentFixture<CalculoFreteCorreiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoFreteCorreiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoFreteCorreiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
