import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';
import { SettingsService } from 'src/app/services/settings.service';
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
    private settingsService: SettingsService,
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
    this.formStyles = this.settingsService.getFormStyles();
    this.elevations = this.settingsService.getElevations();
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
      this.loadDefaults();
    });
  }

  addChip(event: MatChipInputEvent, list): void {
    const input = event.input;
    const value = event.value;
    console.log("input: " + input);
    console.log("value: " + value);
    // Add
    if ((value || '').trim()) {
      list.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeChip(item, list): void {
    this.swalService.promptSwal("Filters zullen niet meer werken voor items die hieraan verbonden zijn, update die items dus ook").then((result) => {
      if (result.value) {
        const index = list.indexOf(item);
        if (index >= 0) {
          list.splice(index, 1);
        }
        this.swalService.successSwal("Verwijderd");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Niet verwijderd");
      }
    });
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    if (!this.content) {
      this.content = new GeneralContent();
    }
    if (!this.content.formStyle) {
      this.content.formStyle = "standard";
    }
    if (!this.content.formColor) {
      this.content.formColor = "accent";
    }
    if (!this.content.cardElevation) {
      this.content.cardElevation = "mat-elevation-z8";
    }
    if (!this.content.pageSizeOptions) {
      this.content.pageSizeOptions = [5, 10, 25, 50];
    }
    if (!this.content.pageSizeDefault) {
      this.content.pageSizeDefault = 10;
    }
    if (!this.content.paintingCategories) {
      this.content.paintingCategories = [
        "Portretten",
        "Natuur",
        "Dieren",
        "TV Series",
        "Algemeen"
      ];
    }
    if (!this.content.paintingStates) {
      this.content.paintingStates = [
        "Beschikbaar",
        "Niet beschikbaar",
        "Opdrachten",
        "Eerdere werken"
      ];
    }
    if (!this.content.paintingPaints) {
      this.content.paintingPaints = [
        "Acryl",
        "Aquarel",
        "Olie",
        "Plakkaat",
        "Water"
      ];
    }
    if (!this.content.paintingMaterials) {
      this.content.paintingMaterials = [
        "Doek",
        "Hout",
      ];
    }
    if (!this.content.newsCategories) {
      this.content.newsCategories = [
        "Exposities",
        "Technologie",
        "Services"
      ];
    }
    if (!this.content.contactformCategories) {
      this.content.contactformCategories = [
        "Vraag",
        "Offerte",
        "Anders"
      ];
    }
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
