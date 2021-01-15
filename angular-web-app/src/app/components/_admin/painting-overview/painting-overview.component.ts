import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painting-overview',
  templateUrl: './painting-overview.component.html',
  styleUrls: ['./painting-overview.component.scss']
})
export class PaintingOverviewComponent implements OnInit {
  title = "Overzicht";
  subTitle = "Portfolio";
  text = "Hier is een overzicht van alle portfolio items te vinden.";
  
  constructor() { }

  ngOnInit(): void {
  }

}
