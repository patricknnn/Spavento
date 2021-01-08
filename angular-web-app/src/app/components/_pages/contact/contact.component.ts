import { Component, OnInit } from '@angular/core';
import { PageContent } from 'src/app/models/pagecontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  pageContent: PageContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.pageContent = this.contentService.getPageContent('contact');
  }

}
