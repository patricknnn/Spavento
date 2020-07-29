import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Painting} from '../../../models/painting';
import {PaintingService} from '../../../services/painting.service';

@Component({
  selector: 'app-painting-detail',
  templateUrl: './painting-detail.component.html',
  styleUrls: ['./painting-detail.component.scss']
})
export class PaintingDetailComponent implements OnInit {
  painting: Painting;
  title = 'Painting details';
  subTitle = 'Some subtitle';

  constructor(
    private route: ActivatedRoute,
    private paintingService: PaintingService
  ) { }

  ngOnInit(): void {
    this.painting = this.paintingService.getPaintingById(+this.route.snapshot.paramMap.get('id'));
  }

}