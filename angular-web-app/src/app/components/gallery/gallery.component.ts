import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Painting } from '../../models/painting';
import { PaintingService } from '../../services/painting.service';
import { Router } from '@angular/router';
import Shuffle from 'shufflejs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('shuffleContainer') private shuffleContainer: ElementRef;
  @ViewChild('shuffleSizer') private shuffleSizer: ElementRef;
  private shuffleInstance: Shuffle;
  paintings: Painting[];
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
    this.paintings = this.paintingService.getAllPaintings();
    this.categories = this.paintingService.getCategories();
    this.paints = this.paintingService.getPaints();
    this.materials = this.paintingService.getMaterials();
    this.states = this.paintingService.getStates();
  }

  ngAfterViewInit(): void {
    this.shuffleInstance = new Shuffle(this.shuffleContainer.nativeElement, {
      itemSelector: '.shuffle-item',
      sizer: this.shuffleSizer.nativeElement
    });
  }

  goToPaintingDetails(paintingId: number): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  // Clear filters and reset
  resetFilters(): void {
    this.activeFilters.categories = [];
    this.activeFilters.paints = [];
    this.activeFilters.materials = [];
    this.activeFilters.states = [];
    this.shuffleInstance.filter();
  }

  updateFilters() {
    // Apply filter
    this.shuffleInstance.filter((element: Element) => {
      return this.itemPassesFilters(element);
    });
  }

  // Check if item passes current filters
  itemPassesFilters(element): boolean {
    var categories = this.activeFilters.categories;
    var paints = this.activeFilters.paints;
    var materials = this.activeFilters.materials;
    var states = this.activeFilters.states;
    var category = element.getAttribute('data-category');
    var paint = element.getAttribute('data-paint');
    var material = element.getAttribute('data-material');
    var state = element.getAttribute('data-status');
    // Categories
    if (categories.length > 0 && !categories.includes(category)) {
      return false;
    }
    // Paints
    if (paints.length > 0 && !paints.includes(paint)) {
      return false;
    }
    // Materials
    if (materials.length > 0 && !materials.includes(material)) {
      return false;
    }
    // States
    if (states.length > 0 && !states.includes(state)) {
      return false;
    }
    return true;
  }

}
