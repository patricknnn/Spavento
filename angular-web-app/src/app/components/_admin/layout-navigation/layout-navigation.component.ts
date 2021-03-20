import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { NavContent } from 'src/app/models/navcontent';
import { NavLink } from 'src/app/models/navlink';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-layout-navigation',
  templateUrl: './layout-navigation.component.html',
  styleUrls: ['./layout-navigation.component.scss']
})
export class LayoutNavigationComponent implements OnInit {
  @ViewChild('navigationForm') form: NgForm;
  @Input() generalContent: GeneralContent;
  title = "Navigatie";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de navigatie op de website.";
  navContent: NavContent;
  navContentHistory: NavContent[];
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
    this.contentService.saveNavContent(this.navContent).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getNavContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.navContentHistory = data;
      this.navContent = data[0];
      if (!this.navContent) {
        this.loadDefaults();
      }
    });
  }

  loadDefaults(): void {
    this.navContent = new NavContent();
    this.navContent.brandName = "Spavento";
    this.navContent.brandImage = "../../../../assets/img/spavento-logo.png";
    this.navContent.navLinks = [
      new NavLink("Home", "/home", true),
      new NavLink("Portfolio", "/portfolio", true),
      new NavLink("News", "/news", true),
      new NavLink("Contact", "/contact", true),
    ];
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
        this.form.form.markAsPristine();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }

}
