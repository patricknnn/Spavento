import { Component, Input, OnInit } from '@angular/core';
import { PageTitle } from 'src/app/models/pagetitle';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comp-header',
  templateUrl: './comp-header.component.html',
  styleUrls: ['./comp-header.component.scss']
})
export class CompHeaderComponent implements OnInit {
  @Input() pageTitle: PageTitle;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Handle submit
  }

  reset(): void {
    this.pageTitle = this.contentService.getPageTitle('home');
  }

}
