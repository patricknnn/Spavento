import { Component, OnInit } from '@angular/core';
import CtaContent from 'src/app/models/ctacontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comp-cta',
  templateUrl: './comp-cta.component.html',
  styleUrls: ['./comp-cta.component.scss']
})
export class CompCtaComponent implements OnInit {
  cta: CtaContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.reset();
  }

  onSubmit() {
    console.log(this.cta);
  }

  reset(): void {
    this.cta = this.contentService.getCtaContent();
  }

}
