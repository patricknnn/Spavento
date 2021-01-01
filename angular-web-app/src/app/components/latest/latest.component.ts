import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaintingService } from '../../services/painting.service';
import { Painting } from '../../models/painting';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  paintings: Painting[];
  groupedPaintings: Painting[];
  painting: Painting;
  smallScreen: boolean;

  constructor(
    private paintingService: PaintingService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.paintings = this.paintingService.getLatestPaintings(6);
    this.groupPaintings();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  groupPaintings(): void {
    if (this.mobileQuery.matches) { // small
      this.groupedPaintings = this.group(this.paintings, 1);
      console.log(this.groupedPaintings);
      
    } else { // large
      this.groupedPaintings = this.group(this.paintings, 3);
    }
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
