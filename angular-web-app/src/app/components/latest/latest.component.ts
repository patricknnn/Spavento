import {Component, OnInit} from '@angular/core';
import {PaintingService} from '../../services/painting.service';
import {Painting} from '../../models/painting';
import {NguCarouselConfig} from '@ngu/carousel';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})

export class LatestComponent implements OnInit {
  paintings: Painting[];
  painting: Painting;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  };

  constructor(private paintingService: PaintingService) {
  }

  ngOnInit(): void {
    this.paintings = this.paintingService.getLatestPaintings(5);
  }

}
