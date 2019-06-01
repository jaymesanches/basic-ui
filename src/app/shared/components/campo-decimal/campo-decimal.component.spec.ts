import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoDecimalComponent } from './campo-decimal.component';

describe('CampoDecimalComponent', () => {
  let component: CampoDecimalComponent;
  let fixture: ComponentFixture<CampoDecimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoDecimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
