import { Component, Input, OnInit } from '@angular/core';
import { Painting } from '../../models/painting';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() painting: Painting;

  constructor(
    private router: Router,
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  goToPaintingDetails(): void {
    this.router.navigate(['/painting', { id: this.painting.id }]);
  }

  getTrimmedDescription(): string {
    const limit = 120;
    if (this.painting.description.length > limit) {
      return this.painting.description.substring(0, limit) + '...';
    } else {
      return this.painting.description;
    }
  }

  openImage(content) {
    this.modalService.openModal(content);
  }

}
