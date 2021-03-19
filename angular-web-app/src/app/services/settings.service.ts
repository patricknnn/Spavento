import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralContent } from '../models/generalcontent';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: GeneralContent;

  constructor(private contentService: ContentService) {
    this.retrieveSettings();
  }

  retrieveSettings(): void {
    this.contentService.getGeneralContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.settings = data[0];
    });
  }

  public getFormStyle(): string {
    return this.settings.formStyle;
  }

  public getPaintingCategories(): string[] {
    return this.settings.paintingCategories;
  }

  public getPaintingStates(): string[] {
    return this.settings.paintingStates;
  }

  public getPaintingPaints(): string[] {
    return this.settings.paintingPaints;
  }

  public getPaintingMaterials(): string[] {
    return this.settings.paintingMaterials;
  }

  public getNewsCategories(): string[] {
    return this.settings.newsCategories;
  }

  public getContactFormCategories(): string[] {
    return this.settings.contactformCategories;
  }

  public getFormStyles(): string[] {
    return [
      "legacy",
      "standard",
      "fill",
      "outline"
    ];
  }

  public getElevations(): string[] {
    return [
      "mat-elevation-z1",
      "mat-elevation-z2",
      "mat-elevation-z3",
      "mat-elevation-z8",
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
