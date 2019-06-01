import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { OrcamentoService } from '../../../../base/services/orcamento.service';
import { Orcamento } from '../orcamento';

@Component({
  selector: 'bsc-orcamento-print',
  templateUrl: './orcamento-print.component.html',
  styleUrls: ['./orcamento-print.component.scss'],
})
export class OrcamentoPrintComponent implements OnInit {

  orcamento = new Orcamento();

  constructor(private service: OrcamentoService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    console.log('ID', id);
    this.service.pesquisar(id).subscribe(data => {
      console.log('DATA', data);
      this.orcamento = data;
    });
  }

  print() {
    const documento = new jsPDF();

    documento.setFont('Courier');
    documento.setFontStyle('bold');
    documento.setFontSize(20);
    documento.text('Orçamento', 25, 11, { align: 'center', baseline: 'middle' });
    documento.rect(5, 5, 200, 8, 'S');

    documento.setFillColor(50, 50, 50);
    documento.rect(10, 20, 30, 8, 'FD');
    documento.rect(10, 28, 30, 8, 'FD');
    documento.rect(10, 36, 30, 8, 'FD');
    documento.rect(40, 20, 160, 8, 'S');
    documento.rect(40, 28, 160, 8, 'S');
    documento.rect(40, 36, 160, 8, 'S');

    documento.setFontSize(12);
    documento.setTextColor(255, 255, 255);
    documento.text('Produto', 12, 25);
    documento.text('Quantidade', 12, 33);
    documento.text('Preço', 12, 41);

    documento.setFontStyle('normal');
    documento.setTextColor(0, 0, 0);
    documento.text('001', 42, 25);
    documento.text('Notebook 14 i7 8GB 1TB', 42, 33);
    documento.text('R$ 2400,00', 42, 41);

    documento.setFontStyle('normal');
    documento.setTextColor(0, 0, 0);
    documento.text('001', 42, 49);
    documento.text('Notebook 14 i7 8GB 1TB', 42, 57);
    documento.text('R$ 2400,00', 42, 65);

    // documento.save('a4.pdf')
    window.open(URL.createObjectURL(documento.output('blob')));
  }

}
