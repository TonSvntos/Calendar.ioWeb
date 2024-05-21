import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrcamento } from 'src/models/IOrcamento';
import { ClienteService } from '../../services/cliente.service';
import { ICliente } from 'src/models/ICliente';
import { IReturnFiles } from 'src/models/IReturnFiles';


@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  constructor(private service: ClienteService, private router: Router,
    private common: CommonService
  ) {}
  OrcamentoTotal: number = 0;
  PagamentoTotal: number = 0;

  listCliente: Array<ICliente> = []

  nomesDosMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  date: Date;
  ngOnInit(): void {

    this.service.GetOrcaments().subscribe(
      (data) => {
        if (data !== undefined) {
          if (data.friendlyErrorMessage !== null) {
            alert(data.friendlyErrorMessage);
          } else {
            this.listCliente = data.data as Array<ICliente>;



            for (let i = 0; i < this.listCliente.length; i++){
              this.date = new Date(this.listCliente[i].dataDoAtendimento);
              let mes = this.date.getMonth();
              this.meses[mes].orcamento += this.listCliente[i].orcamento;
              this.meses[mes].pagamento += this.listCliente[i].pagamento;

            }


          }
        }
      },
      (error) => {
        alert('Erro inesperado');
        console.log(error);
      }
    );

    this.meses.forEach(x => {
      this.PagamentoTotal += x.pagamento
      this.OrcamentoTotal += x.orcamento

    })


  }


  GerarPlanilhaExcel(){
    this.service.GenerateExcel(this.meses).subscribe(
      (data) => {
        if (data !== undefined) {
          if (data.friendlyErrorMessage !== null) {
            alert(data.friendlyErrorMessage);
          } else {
            let retorno = data.data as IReturnFiles;


            if (!this.common.ObjIsNullOrUndefined(retorno.content)) {

              let contentType = "application/octet-stream";
              let blob2 = this.common.b64toBlob(retorno.content, contentType, 512);
              let fileURL = URL.createObjectURL(blob2);
              let a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.href = fileURL;
              a.target = "_blank";
              a.download = retorno.nmFile + ".xlsx";
              a.click();
              a.remove();
          }
          }
        }
      },
      (error) => {
        alert('Erro inesperado');
        console.log(error);
      }
    );
    return true;

  }




  meses: Array<IOrcamento> = [

    {mes: 'Janeiro',    orcamento: 0, pagamento: 0 },
    {mes: 'Fevereiro',  orcamento: 0, pagamento: 0 },
    {mes: 'Março',      orcamento: 0, pagamento: 0 },
    {mes: 'Abril',      orcamento: 0, pagamento: 0 },
    {mes: 'Maio',       orcamento: 0, pagamento: 0 },
    {mes: 'Junho',      orcamento: 0, pagamento: 0 },
    {mes: 'Julho',      orcamento: 0, pagamento: 0 },
    {mes: 'Agosto',     orcamento: 0, pagamento: 0 },
    {mes: 'Setembro',   orcamento: 0, pagamento: 0 },
    {mes: 'Outubro',    orcamento: 0, pagamento: 0},
    {mes: 'Novembro',   orcamento: 0, pagamento: 0 },
    {mes: 'Dezembro',   orcamento: 0, pagamento: 0 }

  ];



}
