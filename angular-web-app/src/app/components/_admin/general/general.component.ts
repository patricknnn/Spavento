import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  title = "Algemeen";
  subTitle = "Admin";
  text = "Hier zijn alle algemene instellingen te vinden.";
  content: GeneralContent;
  contentHistory: GeneralContent[];
  formStyles: string[];
  elevations: string[];

  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
    this.formStyles = this.contentService.getFormStyles();
    this.elevations = this.getElevations();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveGeneralContent(this.content).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getGeneralContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.contentHistory = data;
      this.content = data[0];
      if (!this.content) {
        this.loadDefaults();
      }
    });
  }


  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    this.content = new GeneralContent();
    this.content.formStyle = "standard";
    this.content.formColor = "accent";
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

  getElevations(): string[] {
    return [
      "mat-elevation-z1",
      "mat-elevation-z2",
      "mat-elevation-z3",
      "mat-elevation-z4",
      "mat-elevation-z5",
      "mat-elevation-z6",
      "mat-elevation-z7",
      "mat-elevation-z8",
      "mat-elevation-z9",
      "mat-elevation-z10",
      "mat-elevation-z11",
      "mat-elevation-z12",
      "mat-elevation-z13",
      "mat-elevation-z14",
      "mat-elevation-z15",
      "mat-elevation-z16",
      "mat-elevation-z17",
      "mat-elevation-z18",
      "mat-elevation-z19",
      "mat-elevation-z20",
      "mat-elevation-z21",
      "mat-elevation-z22",
      "mat-elevation-z23",
      "mat-elevation-z24",
    ];
  }

}
