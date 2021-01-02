import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Painting } from 'src/app/models/painting';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {
  @Input() painting: Painting;
  @Input() maxHeight = '100%';

  constructor(
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  openImage(content) {
    this.modalService.openModal(content);
  }

}
