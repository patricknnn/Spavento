import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comp-contact-cards',
  templateUrl: './comp-contact-cards.component.html',
  styleUrls: ['./comp-contact-cards.component.scss']
})
export class CompContactCardsComponent implements OnInit {

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

}
