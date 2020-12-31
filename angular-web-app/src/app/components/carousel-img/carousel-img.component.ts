import {Component, Input, OnInit} from '@angular/core';
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

  constructor(
    private paintingService: PaintingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.images = this.paintingService.getImagesByPaintingId(this.paintingId);
  }
}
