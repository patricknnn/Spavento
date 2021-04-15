import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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

  constructor(
    private calendarService: CalendarService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.retrievePageTitle();
    this.retrieveGeneralContent();
    this.retrieveCalendar();
  }

  retrieveCalendar(): void {
    this.calendarService.getAllActive().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.calendarItems = data;
    });
  }

  retrievePageTitle(): void {
    this.pageTitle = new PageTitle();
    this.pageTitle.title = "Kalender";
    // this.contentService.getPageTitle('calendar').snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.pageTitle = data[0];
    // });
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

}
