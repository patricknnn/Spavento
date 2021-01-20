import { Component, OnInit } from '@angular/core';
import { FeaturedContent } from 'src/app/models/featuredcontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comp-features',
  templateUrl: './comp-features.component.html',
  styleUrls: ['./comp-features.component.scss']
})
export class CompFeaturesComponent implements OnInit {
  featured: FeaturedContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.featured = this.contentService.getFeaturedContent();
  }

}
