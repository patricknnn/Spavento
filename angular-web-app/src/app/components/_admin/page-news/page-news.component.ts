import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-news',
  templateUrl: './page-news.component.html',
  styleUrls: ['./page-news.component.scss']
})
export class PageNewsComponent implements OnInit {
  title = "Nieuws";
  subTitle = "Pagina";
  text = "Stel hier alles in met betrekking tot de nieuws pagina op de website.";
  panelStep = -1;;

  constructor() { }

  ngOnInit(): void {
  }
  
  setStep(i: number) {
    this.panelStep = i;
  }

  nextStep() {
    this.panelStep++;
  }

  prevStep() {
    this.panelStep--;
  }

}
