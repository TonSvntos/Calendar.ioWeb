import { Component, OnInit } from '@angular/core';
import { ICliente } from '../models/ICliente';



@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  filterCliente: ICliente = {
    nomeCliente: '',
    clienteEndereco: '',
    clienteBairro: '',
    clienteTelefone: null,
    tipoDeServico: 'Todos',
    dataDoAtendimento: null
  }

  listCliente: Array<ICliente> = [];


  Search(){
    console.log('buscou');
  }
}
