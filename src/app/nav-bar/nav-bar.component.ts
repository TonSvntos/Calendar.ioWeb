import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
 
export class NavBarComponent implements OnInit {

  constructor() { }

  icone: string = 'lua';

  body: HTMLElement;

  ngOnInit(): void {

    this.body = document.querySelector('#body');
  }




  darkmode : boolean = false;

  alterarModoEscuro() {

    if (!this.darkmode) {
      this.body.classList.add('dark-mode');
      this.icone = 'sol'

    } else {

      this.body.classList.remove('dark-mode');
      this.icone = 'lua'

    }
    this.darkmode = !this.darkmode;
  }

  ngAfterViewInit(): void {
    this.mobileMenu(); // Call mobileMenu after the view is initialized
  }

  mobileMenu() {
    let active = false;
    const navBarContainer = this.body.querySelector('.navbar-nav');
    console.log(navBarContainer);
    const displayElements = () => {
      if (!active) {
        navBarContainer.classList.add('active');
      } else {
        navBarContainer.classList.remove('active');
      }
      active = !active; 
    };
    const toggleButton = this.body.querySelector('.navbar-toggler');
    toggleButton.addEventListener('click', displayElements); 
  }
}
