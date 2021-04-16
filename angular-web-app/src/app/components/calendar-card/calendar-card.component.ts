import { Component, Input, OnInit } from '@angular/core';
import { CalendarItem } from 'src/app/models/calendaritem';

@Component({
  selector: 'app-calendar-card',
  templateUrl: './calendar-card.component.html',
  styleUrls: ['./calendar-card.component.scss']
})
export class CalendarCardComponent implements OnInit {
  @Input() calendarItem: CalendarItem;
  @Input() elevation: string;
  startDate: Date;
  endDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.startDate = new Date(this.calendarItem.dateStart);
    this.endDate = new Date(this.calendarItem.dateEnd);
  }

  multipleDays(): boolean {
    return this.startDate.toISOString() != this.endDate.toISOString();
  }

  getDay(num): string {
    let day = "";
    switch (num) {
      case 0:
        day = "Zondag";
        break;
      case 1:
        day = "Maandag";
        break;
      case 2:
        day = "Dinsdag";
        break;
      case 3:
        day = "Woensdag";
        break;
      case 4:
        day = "Donderdag";
        break;
      case 5:
        day = "Vrijdag";
        break;
      case 6:
        day = "Zaterdag";
        break;
    }
    return day;
  }

  getMonth(num): string {
    let month = "";
    switch (num) {
      case 0:
        month = "Januari";
        break;
      case 1:
        month = "Februari";
        break;
      case 2:
        month = "Maart";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "Mei";
        break;
      case 5:
        month = "Juni";
        break;
      case 6:
        month = "Juli";
        break;
      case 7:
        month = "Augustus";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }
    return month;
  }

}
