import { Component, OnInit } from '@angular/core';
import ServiceContent from 'src/app/models/servicecontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comp-services',
  templateUrl: './comp-services.component.html',
  styleUrls: ['./comp-services.component.scss']
})
export class CompServicesComponent implements OnInit {
  services: ServiceContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.reset();
  }

  onSubmit() {
    // Handle submit
  }

  reset(): void {
    this.services = this.contentService.getServicesContent();
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

}
