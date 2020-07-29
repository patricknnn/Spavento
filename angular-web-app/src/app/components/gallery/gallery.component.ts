import {Component, OnInit} from '@angular/core';
import {Painting} from '../../models/painting';
import {PaintingService} from '../../services/painting.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  paintings: Painting[];

  constructor(
    private paintingService: PaintingService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.paintings = this.paintingService.getAllPaintings();
  }

  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', {id: paintingId}]);
  }
}
