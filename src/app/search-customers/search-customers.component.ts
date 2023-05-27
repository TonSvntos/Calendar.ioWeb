import { ClienteService } from './../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ICliente } from '../models/ICliente';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  constructor(
    private ClienteService: ClienteService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onServiceFilterChange(event) {
    const selectElement = event.target;
    const optionIndex = selectElement.selectedIndex;
    if (optionIndex == 0) {
      this.filterCliente.tipoDeServico = "Todos";
    }
    else if (optionIndex == 1) {
      this.filterCliente.tipoDeServico = "Instalacao";
    }
    else if (optionIndex == 2) {
      this.filterCliente.tipoDeServico = "Higienizacao";
    }
    else if (optionIndex == 3) {
      this.filterCliente.tipoDeServico = "Remocao";
    }
    else {
      this.filterCliente.tipoDeServico = "Revisao";
    }
  }

  filterCliente: ICliente = {
    clienteId: 0,
    nomeCliente: '',
    clienteEndereco: '',
    clienteBairro: '',
    clienteTelefone: null,
    tipoDeServico: 'Todos',
    dataDoAtendimento: null
  }

  listCliente: Array<ICliente> = [];


  addCliente: ICliente = {
    clienteId: 0,
    nomeCliente: '',
    clienteEndereco: '',
    clienteBairro: '',
    clienteTelefone: null,
    tipoDeServico: 'Instalacao',
    dataDoAtendimento: null
  }


  onServiceChange(event) {
    const selectElement = event.target;
    const optionIndex = selectElement.selectedIndex;
    if (optionIndex == 0) {
      this.addCliente.tipoDeServico = "Instalacao";
    }
    else if (optionIndex == 1) {
      this.addCliente.tipoDeServico = "Higienizacao";
    }
    else if (optionIndex == 2) {
      this.addCliente.tipoDeServico = "Remocao";
    }
    else {
      this.addCliente.tipoDeServico = "Revisao";
    }
  }

  updateFilterDate(event) {
    let data;
    if (event.target.value == "") {
      data = null;
    }
    else {
      data = event.target.value;
      const ano = parseInt(data.substr(0, 4), 10);
      const mes = parseInt(data.substr(5, 2), 10) - 1;
      const dia = parseInt(data.substr(8, 2), 10);

      this.filterCliente.dataDoAtendimento = new Date(ano, mes, dia);

    }
  }

  errorMsgInsOrUpd: string;

  ValidateInsUpd(){
    this.errorMsgInsOrUpd = "";
    console.log(this.addCliente.nomeCliente);

    if (this.addCliente.nomeCliente === null || this.addCliente.nomeCliente === "" || this.addCliente.nomeCliente === undefined) {
      this.errorMsgInsOrUpd = "Por favor, insira o nome do cliente";
      return false;
    }
    if (this.addCliente.clienteTelefone == null || this.addCliente.clienteTelefone === undefined) {
      this.errorMsgInsOrUpd = "Por favor, insira o telefone do cliente";
      return false;
    }
    if (this.addCliente.clienteEndereco === null || this.addCliente.clienteEndereco === "" || this.addCliente.clienteEndereco === undefined) {
      this.errorMsgInsOrUpd = "Por favor, insira o endereço do cliente";
      return false;
    }
    if (this.addCliente.clienteBairro === null || this.addCliente.clienteBairro === "" || this.addCliente.clienteBairro === undefined) {
      this.errorMsgInsOrUpd = "Por favor, insira um bairro";
      return false;
    }
    return true;
  }

  Adcionar(){
      console.log(this.addCliente.tipoDeServico);


      if(!this.ValidateInsUpd())
      {
        alert(this.errorMsgInsOrUpd);
        return false;
      }

      this.ClienteService.Inserir(this.addCliente).subscribe(
        data => {
          if(data !== undefined)
          {
            if(data.friendlyErrorMessage !== null)
            {
              alert(data.friendlyErrorMessage);

            }
            else{
              alert('Cliente inserido com sucesso!');
              this.addCliente = null;
            }
          }
        },
        error => {
        alert('Erro inesperado');
        console.log(error);
        }
      );
       return true;

      }


  Search(){

    if(this.filterCliente.tipoDeServico === "Todos")
    {
      this.filterCliente.tipoDeServico = null;
    }

      this.ClienteService.Buscar(this.filterCliente).subscribe(
        data => {
          if(data !== undefined)
          {
            if(data.friendlyErrorMessage != null)
            {
              alert(data.friendlyErrorMessage);
            }
            else{
              this.listCliente = data.data as Array<ICliente>;
              console.log(this.listCliente)
            }
          }
        },
        error => {
        alert('Erro inesperado');
        console.log(error);
        }
        );
      }
}

