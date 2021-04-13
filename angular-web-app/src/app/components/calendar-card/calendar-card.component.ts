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

  constructor() { }

  ngOnInit(): void {
  }

}
