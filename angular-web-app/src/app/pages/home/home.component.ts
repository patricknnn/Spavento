import {Component, OnInit} from '@angular/core';
import {Service} from '../../models/service';
import {Painting} from '../../models/painting';
import {PaintingService} from '../../services/painting.service';

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
        'fa-gem',
        'Custom Work',
        'Custom paintings made to fit your wishes!'
      ),
      new Service(
        'fa-globe',
        'Up to Date',
        'Our themes are updated regularly to keep them bug free!'
      ),
      new Service(
        'fa-heart',
        'Made with Love',
        'Is it really open source if it\'s not made with love?'
      )
    ];
  }

}
