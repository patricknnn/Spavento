import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  title = "Home";
  subTitle = "Pagina";
  text = "Stel hier alles in met betrekking tot de home pagina op de website.";
  panelStep: number;

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
