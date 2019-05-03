import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAutoCompleteComponent } from './cliente-auto-complete.component';

describe('ClienteAutoCompleteComponent', () => {
  let component: ClienteAutoCompleteComponent;
  let fixture: ComponentFixture<ClienteAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
