import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Painting } from '../../models/painting';
import { PaintingService } from '../../services/painting.service';
import { map } from 'rxjs/operators';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { GeneralContent } from 'src/app/models/generalcontent';
import Shuffle from 'shufflejs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-gallery',
  animations: [fadeAnimation],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() generalContent: GeneralContent;
  private shuffleInstance: Shuffle;
  paintings: Painting[];
  modalPainting: Painting;
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
  @ViewChildren('shuffleItems') shuffleItems: QueryList<any>;

  /**
   * Constructor
   * @param paintingService painting service
   * @param router router
   */
  constructor(
    private paintingService: PaintingService,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.retrievePaintings();
  }

  ngAfterViewInit(): void {
    let scrollY = this.scrollService.getScrollPosition("portfolio");
    this.shuffleItems.changes.subscribe(t => {
      setTimeout(() => {
        this.initShuffle();
        setTimeout(() => {
          window.scrollTo(0, scrollY);
        }, 500);
      }, 500);
    });
  }

  ngOnDestroy(): void {
    if (this.shuffleInstance) {
      this.shuffleInstance.destroy();
    }
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
    });
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

  // Apply filter
  applyFilters() {
    if (this.shuffleInstance) {
      this.shuffleInstance.filter((element: Element) => {
        return this.itemPassesFilters(element);
      });
    }
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

  // Clear filters and reset
  resetFilters(): void {
    this.activeFilters.categories = [];
    this.activeFilters.paints = [];
    this.activeFilters.materials = [];
    this.activeFilters.states = [];
    if (this.shuffleInstance) {
      this.shuffleInstance.filter();
    }
  }

}
