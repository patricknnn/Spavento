import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Painting } from '../../models/painting';
import { PaintingService } from '../../services/painting.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { GeneralContent } from 'src/app/models/generalcontent';
import Shuffle from 'shufflejs';

@Component({
  selector: 'app-gallery',
  animations: [fadeAnimation],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() generalContent: GeneralContent;
  private shuffleInstance: Shuffle;
  paintings: Painting[];
  filteredPaintings: Painting[];
  activeFilters = {
    categories: [],
    paints: [],
    materials: [],
    states: [],
  };

  @ViewChild('pageLoader') private pageLoader: ElementRef;
  @ViewChild('pageContent') private pageContent: ElementRef;
  @ViewChild('shuffleContainer') private shuffleContainer: ElementRef;
  @ViewChild('shuffleSizer') private shuffleSizer: ElementRef;

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
  }

  initShuffle(): void {
    this.shuffleInstance = new Shuffle(this.shuffleContainer.nativeElement, {
      itemSelector: '.shuffle-item',
      sizer: this.shuffleSizer.nativeElement
    });
    this.pageContent.nativeElement.classList.remove("d-none");
    this.pageLoader.nativeElement.classList.add("d-none");
    this.shuffleInstance.update();
  }

  retrievePaintings(): void {
    this.paintingService.getAllActive().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.paintings = data;
      this.resetFilters();
      setTimeout(() => {
        this.initShuffle();
      }, 2500);
    });
  }

  goToPaintingDetails(paintingId: string): void {
    this.router.navigate(['/painting', { id: paintingId }]);
  }

  // Apply filter
  applyFilters() {
    // this.filteredPaintings = this.paintings.filter((painting: Painting) => {
    //   return this.itemPassesFilters(painting);
    // });
    // Apply filter
    if (this.shuffleInstance) {
      this.shuffleInstance.filter((element: Element) => {
        return this.itemPassesShuffleFilters(element);
      });
    }
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

  // Check if item passes current filters
  itemPassesShuffleFilters(element): boolean {
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

  // Clear filters and reset
  resetFilters(): void {
    this.activeFilters.categories = [];
    this.activeFilters.paints = [];
    this.activeFilters.materials = [];
    this.activeFilters.states = [];
    this.filteredPaintings = this.paintings;
    if (this.shuffleInstance) {
      this.shuffleInstance.filter();
    }
  }

}
