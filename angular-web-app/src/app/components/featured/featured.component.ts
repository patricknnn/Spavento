import {Component, Input, OnInit} from '@angular/core';
import {Painting} from '../../models/painting';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() painting: Painting;

  constructor() { }

  ngOnInit(): void {
  }

}
