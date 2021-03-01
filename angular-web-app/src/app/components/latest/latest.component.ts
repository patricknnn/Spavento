import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaintingService } from '../../services/painting.service';
import { Painting } from '../../models/painting';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit, OnChanges {
  @Input() amount: number = 3;
  groupedPaintings: Painting[];
  smallScreen = '(max-width: 767px)';
  mediumScreen = '(min-width: 768px) and (max-width: 991px)';
  largeScreen = '(min-width: 992px)';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private paintingService: PaintingService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.observeBreakpoints();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  // Open details page
  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  // Fetch paintings and group them
  groupPaintings(size: number): void {
    let paintings = this.paintingService.getLatest(this.amount);
    this.groupedPaintings = this.group(paintings, size);
  }

  // Groups array in chunks
  group(array, size) {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  };

  // Observe breakpoints
  observeBreakpoints(): void {
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

}
