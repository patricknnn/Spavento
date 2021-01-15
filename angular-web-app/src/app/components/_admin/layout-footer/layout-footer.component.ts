import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent implements OnInit {
  title = "Footer";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de footer op de website.";

  constructor() { }

  ngOnInit(): void {
  }

}
