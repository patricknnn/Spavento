import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-portfolio',
  templateUrl: './page-portfolio.component.html',
  styleUrls: ['./page-portfolio.component.scss']
})
export class PagePortfolioComponent implements OnInit {
  title = "Portfolio";
  subTitle = "Pagina";
  text = "Stel hier alles in met betrekking tot de portfolio pagina op de website.";
  
  constructor() { }

  ngOnInit(): void {
  }

}
