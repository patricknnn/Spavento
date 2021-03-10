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

  onSubmit() {
    // Handle submit
  }

  reset(): void {
    this.latestWork = this.contentService.getLatestWorkContent()[0];
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

}
