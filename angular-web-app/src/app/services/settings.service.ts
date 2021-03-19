import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() {
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
