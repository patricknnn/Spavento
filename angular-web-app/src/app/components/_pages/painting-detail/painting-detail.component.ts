import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Painting } from '../../../models/painting';
import { PaintingService } from '../../../services/painting.service';

@Component({
  selector: 'app-painting-detail',
  templateUrl: './painting-detail.component.html',
  styleUrls: ['./painting-detail.component.scss'],
})
export class PaintingDetailComponent implements OnInit {
  title = '';
  subTitle = 'Painting details';
  painting: Painting;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paintingService: PaintingService
  ) {}

  ngOnInit(): void {
    this.painting = this.paintingService.getPaintingById(
      +this.route.snapshot.paramMap.get('id')
    );
    if (!this.painting) {
      this.goTo404();
    }
  }

  goTo404(): void {
    this.router.navigate(['/page-not-found']);
  }
}
