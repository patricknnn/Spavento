import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaintingService } from '../../services/painting.service';
import { Painting } from '../../models/painting';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit, OnChanges {
  @Input() generalContent: GeneralContent;
  @Input() amount: number = 3;
  @Input() maxHeight = "50vh";
  paintings: Painting[];

  constructor(
    private paintingService: PaintingService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.retrieveData();
  }

  retrieveData(): void {
    this.paintingService.getLatest(this.amount).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.paintings = data;
    });
  }

  // Open details page
  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

}
