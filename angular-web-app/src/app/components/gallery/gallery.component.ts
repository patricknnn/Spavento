import { Component, Input, OnInit } from '@angular/core';
import Painting from '../../models/painting';
import { PaintingService } from '../../services/painting.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() maxHeight: string = '100%';
  paintings: Painting[];
  filteredPaintings: Painting[];
  filterApplied: boolean;
  categories: string[];
  paints: string[];
  materials: string[];
  states: string[];
  activeFilters = {
    categories: [],
    paints: [],
    materials: [],
    states: [],
  };

  /**
   * Constructor
   * @param paintingService painting service
   * @param router router
   */
  constructor(
    private paintingService: PaintingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.retrievePaintings();
    this.categories = this.paintingService.getCategories();
    this.paints = this.paintingService.getPaints();
    this.materials = this.paintingService.getMaterials();
    this.states = this.paintingService.getStates();
    this.filterApplied = true;
  }

  retrievePaintings(): void {
    this.paintingService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.paintings = data;
      this.resetFilters();
    });
  }


  goToPaintingDetails(paintingId: string): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  // Apply filter
  applyFilters() {
    this.filteredPaintings = this.paintings.filter((painting: Painting) => {
      return this.itemPassesFilters(painting);
    });
  }

  // Check if item passes current filters
  itemPassesFilters(painting: Painting): boolean {
    var categories = this.activeFilters.categories;
    var paints = this.activeFilters.paints;
    var materials = this.activeFilters.materials;
    var states = this.activeFilters.states;
    // Categories
    if (categories.length > 0 && !categories.includes(painting.category)) {
      return false;
    }
    // Paints
    if (paints.length > 0 && !paints.includes(painting.paint)) {
      return false;
    }
    // Materials
    if (materials.length > 0 && !materials.includes(painting.material)) {
      return false;
    }
    // States
    if (states.length > 0 && !states.includes(painting.status)) {
      return false;
    }
    return true;
  }

  // Clear filters and reset
  resetFilters(): void {
    this.activeFilters.categories = [];
    this.activeFilters.paints = [];
    this.activeFilters.materials = [];
    this.activeFilters.states = [];
    this.filteredPaintings = this.paintings;
  }

}
