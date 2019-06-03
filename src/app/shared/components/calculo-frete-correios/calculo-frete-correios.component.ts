import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'bsc-calculo-frete-correios',
  templateUrl: './calculo-frete-correios.component.html',
  styleUrls: ['./calculo-frete-correios.component.scss']
})
export class CalculoFreteCorreiosComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
