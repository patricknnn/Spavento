import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FooterContent } from 'src/app/models/footercontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent implements OnInit {
  title = "Footer";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de footer op de website.";
  footerContent: FooterContent;
  footerContentHistory: FooterContent[];
  formStyle = "standard";
  formColor = "accent";
  
  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveFooterContent(this.footerContent).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getFooterContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.footerContentHistory = data;
      this.footerContent = data[0];
      if (!this.footerContent) {
        this.loadDefaults();
      }
    });
  }

  loadDefaults(): void {
    this.footerContent = new FooterContent();
    this.footerContent.aboutTitle = "Over";
    this.footerContent.aboutText = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu. Cras ac vehicula diam. Nullam molestie vehicula ipsum a consequat.";
    this.footerContent.socialTitle = "Volg ons";
    this.footerContent.socialText = "Blijf op de hoogte";
    this.footerContent.facebookLink = "";
    this.footerContent.twitterLink = "";
    this.footerContent.instagramLink = "";
    this.footerContent.footerText = "&copy; 2021 Spavento";
  }

  setVisibility(navlink, e): void {
    e.checked ? navlink.visible = true : navlink.visible = false;
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
