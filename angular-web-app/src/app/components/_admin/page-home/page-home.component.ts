import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  title = "Home";
  subTitle = "Pagina";
  text = "Stel hier alles in met betrekking tot de home pagina op de website.";
  panelStep = -1;
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

  setStep(i: number) {
    this.panelStep = i;
  }

  nextStep() {
    this.panelStep++;
  }

  prevStep() {
    this.panelStep--;
  }

}
