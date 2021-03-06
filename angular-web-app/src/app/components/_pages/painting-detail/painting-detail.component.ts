import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';
import { Painting } from '../../../models/painting';
import { PaintingService } from '../../../services/painting.service';

@Component({
  selector: 'app-painting-detail',
  templateUrl: './painting-detail.component.html',
  styleUrls: ['./painting-detail.component.scss'],
})
export class PaintingDetailComponent implements OnInit {
  @Input() painting: Painting;
  generalContent: GeneralContent;
  panelOpenState = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paintingService: PaintingService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.retrieveGeneralContent();
    if (!this.painting) {
      let id = this.route.snapshot.paramMap.get('id');
      id ? this.retrievePainting(id) : this.goTo404();
    }
  }

  retrievePainting(id: string): void {
    this.paintingService.getById(id).snapshotChanges().pipe(
      map(c =>
        ({ id: c.payload.id, ...c.payload.data() })
      )
    ).subscribe(data => {
      this.painting = data;
      if (!this.painting) {
        this.goTo404();
      } else {
        if (!this.painting.price) {
          this.painting.price = "n.v.t.";
        }
        if (!this.painting.price.startsWith('€')) {
          this.painting.price = '€ ' + this.painting.price;
        }
      }
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

  goTo404(): void {
    this.router.navigate(['/page-not-found']);
  }
}
