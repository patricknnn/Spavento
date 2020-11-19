import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Painting } from 'src/app/models/painting';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {
  @Input() painting: Painting;

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  openImage(content) {
    this.modalService.open(content, {
      size: 'xl',
      windowClass: 'transparent-modal',
    });
  }

}
