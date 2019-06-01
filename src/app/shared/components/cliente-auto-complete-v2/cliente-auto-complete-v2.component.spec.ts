import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAutoCompleteV2Component } from './cliente-auto-complete-v2.component';

describe('ClienteAutoCompleteV2Component', () => {
  let component: ClienteAutoCompleteV2Component;
  let fixture: ComponentFixture<ClienteAutoCompleteV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteAutoCompleteV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteAutoCompleteV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
