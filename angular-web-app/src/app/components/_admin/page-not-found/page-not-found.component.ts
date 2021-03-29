import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { PageNotFoundContent } from 'src/app/models/pagenotfoundcontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-page-not-found-admin',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundAdminComponent implements OnInit {
  generalContent: GeneralContent;
  title = "404, Pagina niet gevonden";
  subTitle = "Pagina";
  text = "Indien een pagina niet wordt gevonden zal een gebruiker deze pagina zien.";
  pageContent: PageNotFoundContent;
  pageContentHistory: PageNotFoundContent[];
  formStyle = "standard";
  formColor = "accent";

  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
    this.retrieveGeneralContent();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.savePageNotFoundContent(this.pageContent).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getPageNotFoundContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pageContentHistory = data;
      this.pageContent = data[0];
      if (!this.pageContent) {
        this.setDefaults();
      }
    });
  }

  retrieveGeneralContent(): void {
    this.contentService.getGeneralContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.generalContent = data[0];
    });
  }

  setDefaults(): void {
    this.pageContent = new PageNotFoundContent();
    this.pageContent.title = "Pagina niet gevonden";
    this.pageContent.subTitle = "404";
    this.pageContent.text = "Gebruik een van de onderstaande knoppen om te navigeren";
    this.pageContent.btnHomeText = "Home";
    this.pageContent.btnHomeLink = "/home";
    this.pageContent.btnBackText = "Back";
  }

  /**
 * Clears form of data
 * Asks user for confirmation
 */
  resetForm() {
    this.swalService.promptSwal("Alle veranderingen zullen worden teruggedraaid").then((result) => {
      if (result.value) {
        this.retrieveData();
        this.swalService.successSwal("Veranderingen teruggedraaid");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }

}
