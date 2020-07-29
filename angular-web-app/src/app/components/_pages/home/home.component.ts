import {Component, OnInit} from '@angular/core';
import {Service} from '../../../models/service';
import {Painting} from '../../../models/painting';
import {PaintingService} from '../../../services/painting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  services: Service[];
  featuredPainting: Painting;

  constructor(private paintingService: PaintingService) {
  }

  ngOnInit(): void {
    this.featuredPainting = this.paintingService.getLatestPaintings(1)[0];
    this.services = [
      new Service(
        'fa-paint-brush',
        'Custom Work',
        'Custom paintings made to fit your wishes.'
      ),
      new Service(
        'fa-palette',
        'Different Styles',
        'I paint in a variety of different styles, from landscapes to portraits.'
      ),
      new Service(
        'fa-eye',
        'Expositions',
        'You can view my work at different expositions.'
      )
    ];
  }

}
