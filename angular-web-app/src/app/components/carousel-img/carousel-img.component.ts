import { Component, Input, OnInit } from '@angular/core';
import { PaintingService } from '../../services/painting.service';
import { ModalService } from 'src/app/services/modal.service';

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
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.images = this.paintingService.getImagesByPaintingId(this.paintingId);
  }

  openImage(content, image) {
    this.modalImage = image;
    this.modalService.openModal(content);
  }
}
