import { Component, OnInit } from '@angular/core';
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
  paintingList: Painting[];

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

  reset(): void {
    this.featured = this.contentService.getFeaturedContent();
    this.paintingList = this.paintingService.getAllPaintings();
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

}
