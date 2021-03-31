import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Painting } from '../../models/painting';
import { PaintingService } from '../../services/painting.service';
import { map } from 'rxjs/operators';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { GeneralContent } from 'src/app/models/generalcontent';
import Shuffle from 'shufflejs';
import { ScrollService } from 'src/app/services/scroll.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
      transition('* <=> *', animate('250ms ease-in-out'))
    ]),
  ]
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
  scrolled: boolean = false;
  animationState = 'out';
  scrollDistance = 50;
  @ViewChild('pageLoader') private pageLoader: ElementRef;
  @ViewChild('pageContent') private pageContent: ElementRef;
  @ViewChild('shuffleContainer') private shuffleContainer: ElementRef;
  @ViewChild('shuffleSizer') private shuffleSizer: ElementRef;
  @ViewChildren('shuffleItems') shuffleItems: QueryList<any>;
  @ViewChild('filterBar') private filterBar: ElementRef;

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
      this.animationState = this.getCurrentScrollTop() > this.scrollDistance / 2 ? 'in' : 'out';
    }
  }

  ngOnInit(): void {
    console.log('onInit');
    this.retrievePaintings();
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit');
    let scrollY = this.scrollService.getScrollPosition("portfolio");
    this.shuffleItems.changes.subscribe(t => {
      console.log('shuffleItemsChanged');
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
    console.log('onDestroy');
    if (this.shuffleInstance) {
      this.shuffleInstance.destroy();
    }
  }

  retrievePaintings(): void {
    console.log('retrievePaintings');
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
    console.log('initShuffle');
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
    console.log('applyFilters');
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
    console.log('resetFilters');
    this.activeFilters.categories = [];
    this.activeFilters.paints = [];
    this.activeFilters.materials = [];
    this.activeFilters.states = [];
    if (this.shuffleInstance) {
      this.shuffleInstance.filter();
    }
  }

  toggleFilter(): void {
    this.animationState == 'visible' ? this.animationState = 'in' : this.animationState = 'visible';
    //this.filterBar.nativeElement.classList.toggle('visible');
  }

  closeFilters(): void {
    this.filterBar.nativeElement.classList.remove('visible');
  }

  getActiveFilterCount(): number {
    return this.activeFilters.categories.length + this.activeFilters.materials.length + this.activeFilters.paints.length + this.activeFilters.states.length;
  }


  /**
   * Get current Y scroll position
   * @returns {number}
   */
  getCurrentScrollTop() {
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
