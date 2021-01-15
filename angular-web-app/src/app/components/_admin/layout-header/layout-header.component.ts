import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  title = "Header";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de header op de website.";

  constructor() { }

  ngOnInit(): void {
  }

}
