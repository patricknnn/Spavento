import { Component, OnInit } from '@angular/core';
import { Painting } from '../../models/painting';
import { PaintingService } from '../../services/painting.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { componentAnimations } from '../../animations/component-animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [componentAnimations],
})
export class GalleryComponent implements OnInit {
  paintings: Painting[];
  filteredPaintings: Painting[];
  filters = ['TV Series', 'Nature', 'Animals'];

  constructor(
    private paintingService: PaintingService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.paintings = this.paintingService.getAllPaintings();
    this.resetFilters();
  }

  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  openImage(content) {
    this.modalService.open(content, {
      size: 'xl',
      windowClass: 'transparent-modal',
    });
  }

  resetFilters(): void {
    this.filteredPaintings = this.paintings;
  }

  setFilter(filter: string): void {
    this.filteredPaintings = this.paintings.filter((painting) => {
      if (painting.category == filter) {
        return true;
      }
    });
  }
}
