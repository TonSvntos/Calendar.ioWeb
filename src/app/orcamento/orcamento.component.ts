import { Component, OnInit } from '@angular/core';
import { IOrcamento } from 'src/models/IOrcamento';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  OrcamentoTotal: number = 0;
  PagamentoTotal: number = 0;

  constructor() { }

  ngOnInit(): void {

    this.meses.forEach(x => {
      this.PagamentoTotal += x.pagamento
      this.OrcamentoTotal += x.orcamento

    })


  }

  meses: Array<IOrcamento> = [

    {mes: 'Janeiro',    orcamento: 1200, pagamento: 500 },
    {mes: 'Fevereiro',  orcamento: 1300, pagamento: 500 },
    {mes: 'Março',      orcamento: 2000, pagamento: 500 },
    {mes: 'Abril',      orcamento: 1500, pagamento: 500 },
    {mes: 'Maio',       orcamento: 0, pagamento: 500 },
    {mes: 'Junho',      orcamento: 2100, pagamento: 500 },
    {mes: 'Julho',      orcamento: 1700, pagamento: 500 },
    {mes: 'Agosto',     orcamento: 3000, pagamento: 500 },
    {mes: 'Setembro',   orcamento: 2100, pagamento: 500 },
    {mes: 'Outubro',    orcamento: 0, pagamento: 500},
    {mes: 'Novembro',   orcamento: 1800, pagamento: 500 },
    {mes: 'Dezembro',   orcamento: 2800, pagamento: 500 }

  ];



}
