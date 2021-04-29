import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { CalendarItem } from 'src/app/models/calendaritem';
import { GeneralContent } from 'src/app/models/generalcontent';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-latest-calendar',
  templateUrl: './latest-calendar.component.html',
  styleUrls: ['./latest-calendar.component.scss']
})
export class LatestCalendarComponent implements OnInit {
  @Input() generalContent: GeneralContent;
  @Input() amount: number = 3;
  calendarItems: CalendarItem[];

  constructor(
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.retrieveItems();
  }

  retrieveItems(): void {
    this.calendarService.getLatest(this.amount).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.calendarItems = data;

    });
  }
}
