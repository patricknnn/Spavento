import { Component, OnInit } from '@angular/core';
import PageNotFoundContent from 'src/app/models/pagenotfoundcontent';
import PageTitle from 'src/app/models/pagetitle';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-page-not-found-admin',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundAdminComponent implements OnInit {
  title = "404, Pagina niet gevonden";
  subTitle = "Pagina";
  text = "Indien een pagina niet wordt gevonden zal een gebruiker deze pagina zien.";
  pageTitle: PageTitle;
  pageContent: PageNotFoundContent;
  panelStep = -1;;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.reset();
  }

  onSubmit() {
    // Handle submit
  }

  reset(): void {
    this.pageTitle = this.contentService.getPageTitle('404');
    this.pageContent = this.contentService.getPageNotFoundContent();
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
