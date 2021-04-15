import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-page-calendar',
  templateUrl: './page-calendar.component.html',
  styleUrls: ['./page-calendar.component.scss']
})
export class PageCalendarComponent implements OnInit {
  title = "Kalender";
  subTitle = "Pagina";
  text = "Stel hier alles in met betrekking tot de kalender pagina op de website.";
  generalContent: GeneralContent;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.retrieveGeneralContent();
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
