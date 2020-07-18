import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  title = 'Portfolio';
  subTitle = 'An overview of my work.';
  images: string[];

  constructor() { }

  ngOnInit(): void {
    this.images = [
      'https://w.wallhaven.cc/full/39/wallhaven-3911w9.jpg',
      'https://w.wallhaven.cc/full/dg/wallhaven-dg7y23.jpg',
      'https://w.wallhaven.cc/full/j5/wallhaven-j5zjoq.png',
      'https://w.wallhaven.cc/full/j5/wallhaven-j5zprq.jpg',
      'https://w.wallhaven.cc/full/j5/wallhaven-j5zzww.jpg',
      'https://w.wallhaven.cc/full/ey/wallhaven-eymker.jpg',
    ];
  }

}
