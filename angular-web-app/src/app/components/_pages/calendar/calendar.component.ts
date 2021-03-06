import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CalendarContent } from 'src/app/models/calendarcontent';
import { CalendarItem } from 'src/app/models/calendaritem';
import { GeneralContent } from 'src/app/models/generalcontent';
import { PageTitle } from 'src/app/models/pagetitle';
import { CalendarService } from 'src/app/services/calendar.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  generalContent: GeneralContent;
  pageTitle: PageTitle;
  calendarItems: CalendarItem[];
  calendarContent: CalendarContent;

  constructor(
    private calendarService: CalendarService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.retrievePageTitle();
    this.retrieveGeneralContent();
    this.retrieveCalendar();
    this.retrieveContent();
  }

  retrieveCalendar(): void {
    this.calendarService.getAllActive().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.calendarItems = this.sortByStartDate(data);
    });
  }

  retrieveContent(): void {
    this.contentService.getCalendarContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.calendarContent = data[0];
    });
  }

  retrievePageTitle(): void {
    this.contentService.getPageTitle('calendar').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pageTitle = data[0];
    });
  }

  retrieveGeneralContent(): void {
    this.contentService.getGeneralContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.generalContent = data[0];
    });
  }

  sortByStartDate(items: CalendarItem[]): CalendarItem[] {
    return items.sort((a: CalendarItem, b: CalendarItem) => {
      return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
    });
  }

}
