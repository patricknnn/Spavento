import {Component, Input, OnInit} from '@angular/core';
import {NguCarouselConfig} from '@ngu/carousel';
import {PaintingService} from '../../services/painting.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carousel-img',
  templateUrl: './carousel-img.component.html',
  styleUrls: ['./carousel-img.component.scss']
})
export class CarouselImgComponent implements OnInit {
  @Input() paintingId: number;
  images: string[];
  selectedImage: string;

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 2, sm: 2, md: 3, lg: 3, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  };

  constructor(
    private paintingService: PaintingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.images = this.paintingService.getImagesByPaintingId(this.paintingId);
    this.selectedImage = this.images[0];
  }

  setSelectedImage(image: string): void {
    this.selectedImage = image;
  }
}
