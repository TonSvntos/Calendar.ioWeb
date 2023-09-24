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
    telefoneCliente: null,
    tipoDeServico: 'Todos',
    dataDoAtendimento: new Date(),
    cep: 0,
    numero: 0,
    complemento: '',
    cidade: ''
  }

  listCliente: Array<ICliente> = [];


  addCliente: ICliente = {
    clienteId: 0,
    nomeCliente: '',
    clienteEndereco: '',
    clienteBairro: '',
    telefoneCliente: null,
    tipoDeServico: 'Instalacao',
    dataDoAtendimento: new Date("2023-05-27"),
    cep: 0,
    numero: 0,
    complemento: '',
    cidade: ''
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

  updateInsertDate(event) {
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

  ValidateInsUpd(item:ICliente){
    this.errorMsgInsOrUpd = "";

    if (item.nomeCliente === null || item.nomeCliente === "" || item.nomeCliente === undefined) {
      this.errorMsgInsOrUpd = "Por favor, insira o nome do cliente";
      return false;
    }
    if (item.telefoneCliente == null || item.telefoneCliente === undefined) {
      this.errorMsgInsOrUpd = "Por favor, insira o telefone do cliente";
      return false;
    }
    if (item.clienteEndereco === null || item.clienteEndereco === "" || item.clienteEndereco === undefined) {
      this.errorMsgInsOrUpd = "Por favor, insira o endereço do cliente";
      return false;
    }
    if (item.clienteBairro === null || item.clienteBairro === "" || item.clienteBairro === undefined) {
      this.errorMsgInsOrUpd = "Por favor, insira um bairro";
      return false;
    }
    return true;
  }


  showMain:boolean = true;
  showModalInsert(){
    this.showMain = false;
  }


  FindClienteList(id: number): ICliente {


    let findGroup: ICliente = this.listCliente.find(x => x.clienteId === id);

    if (findGroup != null) {
      this.updCliente = findGroup;
    }

    return this.updCliente;
  }

  updCliente: ICliente = {
    clienteId: 0,
    nomeCliente: '',
    clienteEndereco: '',
    clienteBairro: '',
    telefoneCliente: null,
    tipoDeServico: 'Instalacao',
    dataDoAtendimento: new Date("2023-05-27"),
    cep: 0,
    numero: 0,
    complemento: '',
    cidade: ''
  }

  Update(){

    // this.updCliente = this.FindClienteList(id);

    if(!this.ValidateInsUpd(this.updCliente))
      {
        alert(this.errorMsgInsOrUpd);
        return false;
      }

      this.ClienteService.Atualizar(this.updCliente).subscribe(
        data => {
          if(data !== undefined)
          {
            if(data.friendlyErrorMessage !== null)
            {
              alert(data.friendlyErrorMessage);

            }
            else{
              alert('Cliente atualizado com sucesso!');
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

  Adcionar(){


      if(!this.ValidateInsUpd(this.addCliente))
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


      buscado: boolean = false;

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
              this.buscado = true;
            }
          }
        },
        error => {
        alert('Erro inesperado');
        console.log(error);
        }
        );
      }

      async onFocusOutEvent($event){
        console.log('teste')
        // let mensagemErro = document.getElementById('erro');

        // mensagemErro.innerHTML = ''; //temos que inicializar como vazio se nao nao conseguimos escreve-la depois

        let cep = this.addCliente.cep;

        try{

        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro){
            throw Error('CEP inválido');
        }

        this.addCliente.cidade = consultaCEPConvertida.localidade;
        this.addCliente.clienteEndereco = consultaCEPConvertida.logradouro;
        this.addCliente.clienteBairro = consultaCEPConvertida.bairro;


        } catch (erro){
            // mensagemErro.innerHTML = '<p>CEP inválido! Tente novamente</p>';
            console.log(erro);
        }

    }

}

