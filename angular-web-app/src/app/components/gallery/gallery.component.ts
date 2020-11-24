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
  filters = ['TV Series', 'Nature', 'Animals'];
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

  resetFilters(): void {
    this.shuffleInstance.filter();
  }

  setFilter(filter: string): void {
    // this.filteredPaintings = this.paintings.filter((painting) => {
    //   if (painting.category == filter) {
    //     return true;
    //   }
    // });
    this.shuffleInstance.filter((element: Element) => {
      return element.getAttribute('data-category') == filter;
    });
  }
}
