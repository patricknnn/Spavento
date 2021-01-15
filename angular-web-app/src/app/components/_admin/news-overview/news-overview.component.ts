import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-overview',
  templateUrl: './news-overview.component.html',
  styleUrls: ['./news-overview.component.scss']
})
export class NewsOverviewComponent implements OnInit {
  title = "Overzicht";
  subTitle = "Nieuws";
  text = "Hier is een overzicht van alle nieuws items te vinden.";

  constructor() { }

  ngOnInit(): void {
  }

}
