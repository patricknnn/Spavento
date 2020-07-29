import {Component, Input, OnInit} from '@angular/core';
import {Painting} from '../../models/painting';
import {Router} from '@angular/router';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() painting: Painting;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  goToPaintingDetails(): void {
    this.router.navigate(['/painting', {id: this.painting.id}]);
  }

  getTrimmedDescription(): string {
    const limit = 120;
    if (this.painting.description.length > limit) {
      return this.painting.description.substring(0, limit) + '...';
    } else {
      return this.painting.description;
    }
  }

}
