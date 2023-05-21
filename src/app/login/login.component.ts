import { Component, OnInit } from '@angular/core';
import { Login } from '../models/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {




  constructor() { }

  ngOnInit(): void {
  }

  login: Login = {
    email: "",
    senha: ""
  };


  Logar(){

  }

}
