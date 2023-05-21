import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  isModalOpen: boolean = false;

  InsertNew(){
    this.isModalOpen = true;
  }


}
