import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-gallery',
  templateUrl: './comp-gallery.component.html',
  styleUrls: ['./comp-gallery.component.scss']
})
export class CompGalleryComponent implements OnInit {
  formStyle = "standard";
  formColor = "accent";
  
  constructor() { }

  ngOnInit(): void {
  }

}
