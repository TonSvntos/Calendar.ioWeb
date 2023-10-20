import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  iconeLua: string = 'https://caelum-online-public.s3.amazonaws.com/1369-alura-mais-dark-mode/lua.png';
  iconeSol: string = 'https://caelum-online-public.s3.amazonaws.com/1369-alura-mais-dark-mode/sol.png';
  body: HTMLElement;
  modal: HTMLElement;

  ngOnInit(): void {

    this.body = document.querySelector('#body');
    this.modal = document.querySelector('#modal-content');

  }

  darkmode : boolean = false;
  togleMode() {

    if (!this.darkmode) {
      this.body.classList.remove('dark-mode');
      this.modal.classList.remove('dark-mode');

    } else {
      this.body.classList.add('dark-mode');
      this.modal.classList.add('dark-mode');

    }
    this.darkmode = !this.darkmode;


    // this.darkmode = !this.darkmode;
  }

}
