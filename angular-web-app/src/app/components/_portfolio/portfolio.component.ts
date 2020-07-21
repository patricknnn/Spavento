import { Component, OnInit } from '@angular/core';
import {Painting} from '../../models/painting';
import {PaintingService} from '../../services/painting.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  title = 'Portfolio';
  subTitle = 'An overview of my work.';
  paintings: Painting[];

  constructor(private paintingService: PaintingService) { }

  ngOnInit(): void {
    this.paintings = this.paintingService.getAllPaintings();
  }

}
