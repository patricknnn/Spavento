import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comp-contact-form',
  templateUrl: './comp-contact-form.component.html',
  styleUrls: ['./comp-contact-form.component.scss']
})
export class CompContactFormComponent implements OnInit {

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  reset(): void {
  }

}
