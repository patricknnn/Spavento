import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Painting } from '../../models/painting';
import { PaintingService } from '../../services/painting.service';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import Shuffle from 'shufflejs';
import { ScrollService } from 'src/app/services/scroll.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GalleryContent } from 'src/app/models/gallerycontent';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('appearInOut', [
      state('in', style({
        'transform': 'translateY(calc(100% - 56px))'
      })),
      state('out', style({
        'transform': 'translateY(100%)'
      })),
      state('visible', style({
        'transform': 'translateY(0%)'
      })),
      transition('* <=> *', animate('250ms cubic-bezier(0.250, 0.460, 0.450, 0.940)'))
    ]),
  ]
})
export class GalleryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() galleryContent: GalleryContent;
  @Input() generalContent: GeneralContent;
  private shuffleInstance: Shuffle;
  paintings: Painting[];
  modalPainting: Painting;
  activeSort = "Standaard";
  activeFilters = {
    sort: ["dom"],
    categories: [],
    paints: [],
    materials: [],
    states: [],
  };
  scrolled: boolean = false;
  filterAnimationState = 'out';
  scrollDistance = 50;
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
    private scrollService: ScrollService,
  ) { }

  /**
   * Listens to window scroll and animates the button
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof (window) !== 'undefined') {
      this.filterAnimationState = this.getCurrentScrollTop() > this.scrollDistance / 2 ? 'in' : 'out';
    }
  }

  ngOnInit(): void {
    this.retrievePaintings();
  }

  ngAfterViewInit(): void {
    let scrollY = this.scrollService.getScrollPosition("portfolio");
    this.shuffleItems.changes.subscribe(t => {
      setTimeout(() => {
        this.initShuffle();
        if (!this.scrolled) {
          setTimeout(() => {
            window.scrollTo(0, scrollY);
            this.scrolled = true;
          }, 500);
        }
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
    let filters = this.paintingService.getActiveFilters();
    if (filters) {
      this.activeFilters = filters;
      this.applyFilters();
    }
  }

  // Apply sorting
  applySort(option: string) {
    this.activeFilters.sort = [option];
    let options = {};
    if (option === 'date-created') {
      options = {
        reverse: true,
        by: this.sortByDate,
      };
    } else if (option === 'title') {
      options = {
        by: this.sortByTitle,
      };
    }
    this.shuffleInstance.sort(options);
  }

  sortByDate(element) {
    return element.getAttribute('data-created');
  }

  sortByTitle(element) {
    return element.getAttribute('data-title').toLowerCase();
  }

  // Apply filter
  applyFilters() {
    if (this.shuffleInstance) {
      this.shuffleInstance.filter((element: Element) => {
        return this.itemPassesFilters(element);
      });
      this.paintingService.setActiveFilters(this.activeFilters);
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
    this.activeSort = 'Standaard';
    this.activeFilters.sort = ["dom"];
    this.activeFilters.categories = [];
    this.activeFilters.paints = [];
    this.activeFilters.materials = [];
    this.activeFilters.states = [];
    if (this.shuffleInstance) {
      this.shuffleInstance.filter();
      this.applySort("dom");
    }
  }

  toggleFilters(): void {
    this.filterAnimationState == 'visible' ? this.filterAnimationState = 'in' : this.filterAnimationState = 'visible';
  }

  openFilters(): void {
    this.filterAnimationState = 'visible';
  }

  closeFilters(): void {
    this.filterAnimationState = 'in';
  }

  getActiveFilterCount(): number {
    return this.activeFilters.categories.length + this.activeFilters.materials.length + this.activeFilters.paints.length + this.activeFilters.states.length;
  }

  /**
   * Get current Y scroll position
   */
  getCurrentScrollTop(): number {
    if (typeof window.scrollY !== 'undefined' && window.scrollY >= 0) {
      return window.scrollY;
    }
    if (typeof window.pageYOffset !== 'undefined' && window.pageYOffset >= 0) {
      return window.pageYOffset;
    }
    if (typeof document.body.scrollTop !== 'undefined' && document.body.scrollTop >= 0) {
      return document.body.scrollTop;
    }
    if (typeof document.documentElement.scrollTop !== 'undefined' && document.documentElement.scrollTop >= 0) {
      return document.documentElement.scrollTop;
    }
    return 0;
  }

}
