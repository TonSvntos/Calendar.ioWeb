import { Component, OnInit } from '@angular/core';
import { ICliente } from '../models/ICliente';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };

  ngOnInit(): void {
    this.displayMonth = this.currentMonth
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
