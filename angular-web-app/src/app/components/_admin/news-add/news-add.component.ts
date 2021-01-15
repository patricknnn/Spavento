import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {
  title = "Toevoegen";
  subTitle = "Nieuws";
  text = "Gebruik deze pagina om items aan het nieuws toe te voegen.";

  constructor() { }

  ngOnInit(): void {
  }

}
