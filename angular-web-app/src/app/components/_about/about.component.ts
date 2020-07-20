import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title = 'About';
  subTitle = 'Everything you need to know.';

  constructor() { }

  ngOnInit(): void {
  }

}
