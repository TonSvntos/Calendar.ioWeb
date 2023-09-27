import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ICliente } from '../models/ICliente';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { ClienteService } from '../services/cliente.service';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {




  constructor(
    private ClienteService: ClienteService,
    private router: Router
    ) { }

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

      this.addCliente.dataDoAtendimento = new Date(ano, mes, dia);

    }
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


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };

  body: HTMLElement;
  ngOnInit(): void {
    this.displayMonth = this.currentMonth
    this.body = document.querySelector('#body');

  }

  darkmode : boolean = false;
  togleMode() {

    if (!this.darkmode) {
      this.body.classList.remove('dark-mode');
    } else {
      this.body.classList.add('dark-mode');
    }
    this.darkmode = !this.darkmode;


    // this.darkmode = !this.darkmode;
  }


  currentDate: Date = new Date();
  currentMonth: Date = new Date();
  displayMonth: any = null;

  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  get daysInMonth(): number[] {
    const days = [];
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }

  prevMonth() {
    this.displayMonth = this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
  }

  nextMonth() {
    this.displayMonth = this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
  }

  teste(day: any){
    console.log(day);
  }

}
