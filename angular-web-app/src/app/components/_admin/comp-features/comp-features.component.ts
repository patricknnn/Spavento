import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FeaturedContent } from 'src/app/models/featuredcontent';
import { Painting } from 'src/app/models/painting';
import { ContentService } from 'src/app/services/content.service';
import { PaintingService } from 'src/app/services/painting.service';

@Component({
  selector: 'app-comp-features',
  templateUrl: './comp-features.component.html',
  styleUrls: ['./comp-features.component.scss']
})
export class CompFeaturesComponent implements OnInit {
  featured: FeaturedContent;
  paintings: Painting[];

  constructor(
    private contentService: ContentService,
    private paintingService: PaintingService
  ) { }

  ngOnInit(): void {
    this.reset();
  }

  onSubmit() {
    // Handle submit
  }

  retrievePaintings(): void {
    this.paintingService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.paintings = data;
    });
  }

  reset(): void {
    this.featured = this.contentService.getFeaturedContent()[0];
    this.retrievePaintings();
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

}
