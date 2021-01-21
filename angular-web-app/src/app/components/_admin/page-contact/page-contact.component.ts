import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-contact',
  templateUrl: './page-contact.component.html',
  styleUrls: ['./page-contact.component.scss']
})
export class PageContactComponent implements OnInit {
  title = "Contact";
  subTitle = "Pagina";
  text = "Stel hier alles in met betrekking tot de contact pagina op de website.";
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
