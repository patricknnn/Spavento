import { Component, OnInit } from '@angular/core';
import { LatestWorkContent } from 'src/app/models/latestworkcontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comp-latest-work',
  templateUrl: './comp-latest-work.component.html',
  styleUrls: ['./comp-latest-work.component.scss']
})
export class CompLatestWorkComponent implements OnInit {
  latestWork: LatestWorkContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.latestWork = this.contentService.getLatestWorkContent();
  }

}
