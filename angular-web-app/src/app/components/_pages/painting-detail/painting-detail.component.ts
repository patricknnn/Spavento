import { Component, Input, OnInit } from '@angular/core';
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
  subTitle = 'Schilderij informatie';
  @Input() painting: Painting;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paintingService: PaintingService
  ) { }

  ngOnInit(): void {
    if (!this.painting) {
      this.paintingService.getByKey(this.route.snapshot.paramMap.get('key'));
      this.goTo404();
    }
  }

  goTo404(): void {
    this.router.navigate(['/page-not-found']);
  }
}
