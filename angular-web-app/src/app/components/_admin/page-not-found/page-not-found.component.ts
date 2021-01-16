import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found-admin',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundAdminComponent implements OnInit {
  title = "404, Pagina niet gevonden";
  subTitle = "Pagina";
  text = "Indien een pagina niet wordt gevonden zal een gebruiker deze pagina zien.";

  constructor() { }

  ngOnInit(): void {
  }

}
