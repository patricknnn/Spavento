import {Component, OnInit} from '@angular/core';
import {Painting} from '../../models/painting';
import {PaintingService} from '../../services/painting.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  paintings: Painting[];

  constructor(private paintingService: PaintingService) {
  }

  ngOnInit(): void {
    this.paintings = this.paintingService.getAllPaintings();
  }
}
