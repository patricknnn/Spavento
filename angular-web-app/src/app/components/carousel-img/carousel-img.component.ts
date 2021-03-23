import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-carousel-img',
  templateUrl: './carousel-img.component.html',
  styleUrls: ['./carousel-img.component.scss']
})
export class CarouselImgComponent implements OnInit {
  @Input() images: string[];
  @Input() elevation: string;
  modalImage: string;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  openImage(content, image) {
    this.modalImage = image;
    this.modalService.openModal(content);
  }
}
