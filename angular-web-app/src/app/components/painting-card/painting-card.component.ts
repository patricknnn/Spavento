import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Painting } from 'src/app/models/painting';
import { ModalService } from 'src/app/services/modal.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {
  @Input() painting: Painting;
  @Input() maxHeight: string;
  @Input() elevation: string;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
  }

  goToPaintingDetails(paintingId: string): void {
    this.scrollService.setScrollPosition("portfolio", window.scrollY);
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  openImage(content) {
    this.modalService.openModal(content);
  }

}
