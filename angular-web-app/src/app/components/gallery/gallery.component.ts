import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Painting } from '../../models/painting';
import { PaintingService } from '../../services/painting.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { componentAnimations } from '../../animations/component-animations';
import Shuffle from 'shufflejs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [componentAnimations],
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('shuffleContainer') private shuffleContainer: ElementRef;
  @ViewChild('shuffleSizer') private shuffleSizer: ElementRef;
  paintings: Painting[];
  filteredPaintings: Painting[];
  categories = ['TV Series', 'Nature', 'Animals'];
  paints = ['Oil', 'Acryl', 'Water'];
  states = ['Sold', 'For Sale'];
  activeFilters = {
    categories: [],
    paints: [],
    states: [],
  };
  private shuffleInstance: Shuffle;

  /**
   * Constructor
   * @param paintingService painting service
   * @param router router
   * @param modalService modal service
   */
  constructor(
    private paintingService: PaintingService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.paintings = this.paintingService.getAllPaintings();
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

  openImage(content) {
    this.modalService.open(content, {
      size: 'xl',
      windowClass: 'transparent-modal',
    });
  }

  // Clear filters and reset
  resetFilters(): void {
    this.activeFilters.categories = [];
    this.activeFilters.paints = [];
    this.activeFilters.states = [];
    this.shuffleInstance.filter();
  }

  // Sets the clicked filter or removes it and applies filter
  setFilter(group: string, filter: string): void {
    var array = this.getFilterArray(group);
    let filterIndex = array.indexOf(filter);
    filterIndex == -1 ? array.push(filter) : array.splice(filterIndex, 1);

    // Apply filter
    this.shuffleInstance.filter((element: Element) => {
      return this.itemPassesFilters(element);
    });

  }

  // Check if item passes current filters
  itemPassesFilters(element): boolean {
    var categories = this.activeFilters.categories;
    var paints = this.activeFilters.paints;
    var states = this.activeFilters.states;
    var category = element.getAttribute('data-category');
    var paint = element.getAttribute('data-paint');
    var state = element.getAttribute('data-status');
    // Categories
    if (categories.length > 0 && !categories.includes(category)) {
      return false;
    }
    // Paints
    if (paints.length > 0 && !paints.includes(paint)) {
      return false;
    }
    // States
    if (states.length > 0 && !states.includes(state)) {
      return false;
    }
    return true;
  }

  // Returnes correct array
  getFilterArray(group: string): any {
    switch (group) {
      case "categories":
        return this.activeFilters.categories;
      case "paints":
        return this.activeFilters.paints;
      case "states":
        return this.activeFilters.states;
      default:
        return [];
    }
  }

}
