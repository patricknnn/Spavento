import { Component, OnInit } from '@angular/core';
import {PaintingService} from '../../services/painting.service';
import {Painting} from '../../models/painting';
import * as $ from 'jquery';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {
  paintings: Painting[];

  constructor(private paintingService: PaintingService) { }

  ngOnInit(): void {
    this.paintings = this.paintingService.getLatestPaintings(3);
  }

}
