import { Component, OnInit } from '@angular/core';
import { PaintingService } from '../../services/painting.service';
import { Painting } from '../../models/painting';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  groupedPaintings: Painting[];
  smallScreen = '(max-width: 767px)';
  mediumScreen = '(min-width: 768px) and (max-width: 991px)';
  largeScreen = '(min-width: 992px)';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private paintingService: PaintingService,
    private router: Router,
  ) {
    this.breakpointObserver.observe([
      this.smallScreen,
      this.mediumScreen,
      this.largeScreen,
    ]).subscribe(result => {
      if (result.breakpoints[this.smallScreen]) { this.groupPaintings(1); }
      if (result.breakpoints[this.mediumScreen]) { this.groupPaintings(2); }
      if (result.breakpoints[this.largeScreen]) { this.groupPaintings(3); }
    });
  }

  ngOnInit(): void {
  }

  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  groupPaintings(size: number): void {
    let paintings = this.paintingService.getLatestPaintings(6);
    this.groupedPaintings = this.group(paintings, size);
  }

  group(array, size) {
    let results = [];
    results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  };

}
