import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string;
  subTitle: string;

  constructor() { }

  ngOnInit(): void {
    this.title = 'Spavento';
    this.subTitle = 'Paintings by';
  }

}
