import {Component, Input, OnInit} from '@angular/core';
import {PaintingService} from '../../services/painting.service';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel-img',
  templateUrl: './carousel-img.component.html',
  styleUrls: ['./carousel-img.component.scss']
})
export class CarouselImgComponent implements OnInit {
  @Input() paintingId: number;
  images: string[];
  modalImage: string;

  constructor(
    private paintingService: PaintingService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.images = this.paintingService.getImagesByPaintingId(this.paintingId);
  }

  openImage(content, image) {
    this.modalImage = image;
    this.modalService.open(content, {
      size: 'xl',
      windowClass: 'transparent-modal',
    });
  }
}
